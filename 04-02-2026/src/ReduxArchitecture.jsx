
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "./Redux/cartSlice";

function ReduxArchitecture() {
  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: "React Book",
    };

    dispatch(addToCart(newItem));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <h1>Redux Architecture and Data Flow</h1>

      <button onClick={handleAdd}>
        Add to Cart
      </button>

      <h2>Cart Items: {items.length}</h2>

      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>

          <button onClick={() => handleRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default ReduxArchitecture;