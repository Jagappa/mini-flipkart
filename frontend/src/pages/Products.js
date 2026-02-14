import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products"
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ❌");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart ✅");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Error adding to cart ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌾 Farmer Products</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              width: "250px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>₹{product.price}</strong></p>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category}</p>

            <button
              onClick={() => handleAddToCart(product._id)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#2e7d32",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px"
              }}
            >
              🛒 Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
