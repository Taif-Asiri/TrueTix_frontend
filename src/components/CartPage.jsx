import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/NavBar";

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
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>

        {message && (
          <p className="text-center text-green-600 font-semibold mb-4">{message}</p>
        )}

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{item.event_name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(item.event_date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold">{item.price ? `$${item.price}` : ""}</p>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Confirm Purchase
            </button>
          </>
        )}
      </div>
    </>
  );
}
