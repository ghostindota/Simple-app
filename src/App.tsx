import { useEffect, useState } from "react";
import Alert from "./Components/Alert";
import Button from "./Components/Button";
import ListGroup from "./Components/ListGroup";
import { FaRegCalendarDays } from "react-icons/fa6";
import Like from "./Components/Like";
import NavBar from "./Components/NavBar";
import Cart from "./Components/Cart";
import Form from "./Components/Form/Form";
import ExpenseFilter from "./Expense/Components/ExpenseFilter";
import ExpenseForm from "./Expense/Components/ExpenseForm";
import ProductList from "./Components/ProductList";
import ExpenseList from "./Expense/Components/ExpenseList";
import axios, { CanceledError } from "axios";

function App() {
  // backend
  interface User {
    name: string;
    id: number;
  }
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const originalUsers = [...users];

  const addUsers = () => {
    const newUser = { id: 0, name: "Mohammad" };
    setUsers([...users, newUser]);

    axios
      .post("https://jsonplaceholder.typicode.com/users/", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setUsers(err.message);
        setUsers(originalUsers);
      });
  };
  const deleteUser = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setErrors(err.message);
        setUsers(originalUsers);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrors(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  //
  const [alertVisible, setAlertVisible] = useState(false);
  var items = ["New York", "Texas", "Florida", "Virginia", "DC"];

  const [cartItems, setCartItems] = useState(["Product 1", "Product 2"]);
  const handleSelectItem = (item: String) => {
    console.log(item);
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "milk", amount: 20, category: "Groceries" },
    { id: 2, description: "Oat", amount: 1, category: "Groceries" },
    { id: 3, description: "Egg", amount: 20, category: "Groceries" },
    { id: 4, description: "Electricity", amount: 50, category: "Utilities" },
  ]);
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;
  const [category, setCategory] = useState("");
  useEffect(() => {});
  return (
    <>
      <div>
        {alertVisible && (
          <Alert onClose={() => setAlertVisible(false)}>My Alert</Alert>
        )}
        <Button color="primary" onClick={() => setAlertVisible(true)}>
          Submit
        </Button>
        <ListGroup
          items={items}
          heading={"Cities"}
          onSelectItem={handleSelectItem}
        ></ListGroup>
        <FaRegCalendarDays size={40} />
        <Like onClick={() => console.log("clicked")}></Like>
        <NavBar cartItemsCount={cartItems.length}></NavBar>
        <Cart cartItems={cartItems} onClear={() => setCartItems([])}></Cart>
        <Form></Form>
      </div>
      <div>
        <hr />
        <hr />
        <hr />
        <br />
        <div className="mb-5">
          <ExpenseForm
            onSubmit={(expense) =>
              setExpenses([
                ...expenses,
                { ...expense, id: expenses.length + 1 },
              ])
            }
          ></ExpenseForm>
        </div>

        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          ></ExpenseFilter>
        </div>
        <ExpenseList
          expenses={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        ></ExpenseList>
      </div>
      <div>
        <select
          name=""
          id=""
          className="form-select"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=""></option>
          <option value="Clothing"> Clothing</option>
          <option value="Household">Household</option>
        </select>
        <ProductList category={category}></ProductList>
      </div>
      <br />
      <br />
      <br />

      <p className="text-danger">{errors}</p>
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={() => addUsers()}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}{" "}
            <button className="btn btn-danger" onClick={() => deleteUser(user)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
