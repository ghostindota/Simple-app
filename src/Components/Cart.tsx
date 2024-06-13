interface Props {
  cartItems: string[];
  onClear :() => void;
}

const cartItems = ({ cartItems, onClear }: Props) => {
  return (
    <>
      <div></div>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>{item} </li>
        ))}
      </ul>
      <button onClick={onClear}>Clear</button>
    </>
  );
};

export default cartItems;
