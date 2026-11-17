import React from "react";
import {
  configureStore,
  createSlice
} from "@reduxjs/toolkit";

import {
  Provider,
  useSelector,
  useDispatch
} from "react-redux";

// 1. Products Data
const products = [
  { id: 1, name: "Laptop", price: 45000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Headphones", price: 1500 },
  { id: 4, name: "Keyboard", price: 1000 },
  { id: 5, name: "Mouse", price: 500 }
];

// 2. Create Cart Slice
const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: []
  },

  reducers: {

    // Add product to cart
    addToCart: (state, action) => {
      const product = state.items.find(
        item => item.id === action.payload.id
      );

      if (product) {
        product.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    // Remove product from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

    // Increase quantity
    increaseQuantity: (state, action) => {
      const product = state.items.find(
        item => item.id === action.payload
      );

      if (product) {
        product.quantity += 1;
      }
    },

    // Decrease quantity
    decreaseQuantity: (state, action) => {
      const product = state.items.find(
        item => item.id === action.payload
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
    }

  }
});

// 3. Export Actions
const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

// 4. Configure Redux Store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

// 5. Shopping Cart Component
function CartApplication() {

  const dispatch = useDispatch();

  // Access global cart state
  const cartItems = useSelector(
    state => state.cart.items
  );

  // Calculate total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div style={{
      padding: "25px",
      fontFamily: "Arial",
      maxWidth: "900px",
      margin: "auto"
    }}>

      <h1 style={{ textAlign: "center" }}>
        Shopping Cart Application
      </h1>

      {/* Product Section */}
      <h2>Available Products</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "15px"
      }}>

        {products.map(product => (

          <div key={product.id} style={{
            border: "1px solid gray",
            padding: "15px",
            borderRadius: "10px"
          }}>

            <h3>{product.name}</h3>

            <p>Price: ₹{product.price.toLocaleString("en-IN")}</p>

            <button onClick={() =>
              dispatch(addToCart(product))
            }>
              Add to Cart
            </button>

          </div>

        ))}

      </div>

      <hr />

      {/* Cart Section */}
      <h2>My Shopping Cart</h2>

      <h3>Total Items: {totalItems}</h3>

      {cartItems.length === 0 ? (

        <p>Your cart is empty. Add some products!</p>

      ) : (

        cartItems.map(item => (

          <div key={item.id} style={{
            border: "1px solid #999",
            padding: "15px",
            marginBottom: "12px",
            borderRadius: "8px"
          }}>

            <h3>{item.name}</h3>

            <p>Price: ₹{item.price.toLocaleString("en-IN")}</p>

            <p>Quantity: {item.quantity}</p>

            <p>
              Subtotal: ₹
              {(item.price * item.quantity).toLocaleString("en-IN")}
            </p>

            <button onClick={() =>
              dispatch(decreaseQuantity(item.id))
            }>
              -
            </button>

            <button onClick={() =>
              dispatch(increaseQuantity(item.id))
            }>
              +
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() =>
                dispatch(removeFromCart(item.id))
              }
            >
              Remove
            </button>

          </div>

        ))

      )}

      <hr />

      {/* Total Price */}
      <h2>
        Total Price: ₹{totalPrice.toLocaleString("en-IN")}
      </h2>

      <button
        onClick={() => dispatch(clearCart())}
        disabled={cartItems.length === 0}
      >
        Clear Cart
      </button>

    </div>
  );
}

// 6. Redux Provider
function ShoppingCart() {

  return (
    <Provider store={store}>
      <CartApplication />
    </Provider>
  );

}

export default ShoppingCart;