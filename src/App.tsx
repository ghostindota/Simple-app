import { useState } from "react";
import Alert from "./Components/Alert";
import Button from "./Components/Button";
import ListGroup from "./Components/ListGroup";
import { FaRegCalendarDays } from "react-icons/fa6";
import Like from "./Components/Like";
import NavBar from "./Components/NavBar";
import Cart from "./Components/Cart";
import Form from "./Components/Form/Form";

function App() {
  const [alertVisible, setAlertVisible] = useState(false);
  var items = ["New York", "Texas", "Florida", "Virginia", "DC"];

  const [cartItems, setCartItems]=useState(["Product 1", "Product 2"])
  const handleSelectItem = (item: String) => {
    console.log(item);
  };
  return (
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
      <Cart cartItems ={cartItems} onClear={()=>setCartItems([])}></Cart>
      <Form></Form>
    </div>
  );
}

export default App;
