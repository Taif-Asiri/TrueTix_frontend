import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/NavBar";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    API.get("/cart/")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Error loading cart:", err));
  }, []);

  const handleCheckout = async () => {
    try {
      const res =await API.post("/cart/checkout/");
      alert("✅ Purchase confirmed! ");
      navigate("/tickets");

    } catch (error) {
      console.error("Checkout failed:", error);
      alert(" Something went wrong during checkout.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{item.event_name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(item.event_date).toLocaleString()}
                    </p>
                  </div>
                  <p className="font-bold">{item.price ? `$${item.price}` : ""}</p>
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
