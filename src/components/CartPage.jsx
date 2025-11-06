import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/NavBar";
import "../styles/CartPage.css"; 

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/cart/")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Error loading cart:", err));
  }, []);

  const handleCheckout = async () => {
    try {
      await API.post("/cart/checkout/");
      alert("✅ Purchase confirmed!");
      navigate("/tickets");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("❌ Something went wrong during checkout.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/cart/${id}/`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      setMessage("✅ Item removed from cart.");
    } catch (error) {
      console.error("❌ Error deleting item:", error);
      setMessage("❌ Failed to delete item.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-container">
          <h2 className="cart-title">🛒 Your Cart</h2>

          {message && (
            <p className="cart-message">{message}</p>
          )}

          {cartItems.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div>
                      <p className="cart-item-name">{item.event_name}</p>
                      <p className="cart-item-date">
                        {new Date(item.event_date).toLocaleString()}
                      </p>
                    </div>
                    <div className="cart-item-actions">
                      <p className="cart-item-price">
                        {item.price ? `$${item.price}` : ""}
                      </p>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <button onClick={handleCheckout} className="checkout-btn">
                Confirm Purchase
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
