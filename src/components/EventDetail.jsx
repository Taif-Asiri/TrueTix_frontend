import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get(`/events/${id}/`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const res = await API.post("/cart/add/", { event_id: id });
      setMessage(res.data.message || "Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err);
      setMessage(err.response?.data?.error || "Failed to add to cart.");
    }
  };
  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
      <p>{event.location}</p>
      <p className="mt-2">{event.description}</p>
      <button 
        onClick={() => handleAddToCart(event.id)} 
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
       {message && (
        <p className="mt-4 text-green-600 font-semibold">{message}</p>
       )}
      </div>
  );
}


export default EventDetails;
