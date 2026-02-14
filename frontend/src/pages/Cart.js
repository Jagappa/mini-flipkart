import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart || cart.message === "Cart is empty") {
    return <h2 style={{ padding: "20px" }}>🛒 Your Cart is Empty</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 My Cart</h2>

      {cart.items.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{item.product.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ₹{item.product.price}</p>
        </div>
      ))}

      <h3>Total: ₹{cart.totalPrice}</h3>

      <button
        onClick={async () => {
          try {
            const token = localStorage.getItem("token");

            await axios.post(
              "http://localhost:5000/api/orders",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("Order Placed Successfully ✅");
            fetchCart(); // refresh cart
          } catch (error) {
            alert("Error placing order ❌");
          }
        }}
        style={{
          padding: "8px 15px",
          backgroundColor: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        📦 Place Order
      </button>
    </div>
  );
};

export default Cart;
