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
import axios from "axios";

function App() {
  // backend
  interface User {
    name: string;
    id: number;
  }
  const [users, setUsers] = useState([]);

  axios
    .get<User[]>("https://jsonplaceholder.typicode.com/users")
    .then((res) => console.log(res.data[0].name));

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
    </>
  );
}

export default App;
