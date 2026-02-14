import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <h2 style={{ padding: "20px" }}>No Orders Found 📦</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>

          <h4>Items:</h4>
          {order.items.map((item) => (
            <div key={item._id}>
              <p>
                {item.product.name} × {item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
