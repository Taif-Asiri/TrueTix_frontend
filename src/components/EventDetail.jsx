import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [seatType, setSeatType] = useState("Front");

  useEffect(() => {
    API.get(`/events/${id}/`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await API.post("/cart/add/", { event_id: id, seat_type: seatType });
      alert("Added to cart!");
      navigate("/cart"); 
      // setMessage(res.data.message || "Added to cart!");
      // await API.post("/cart/checkout/");
      // alert("Purchase confirmed!");
      // navigate("/tickets");

    } catch (error) {
      // console.error("Error adding to cart:", err.response?.data || err);
      // setMessage(err.response?.data?.error || "Failed to add to cart.");
      console.error("Error adding to cart:", error);
      alert("❌ Failed to add to cart.");
    }
  };
  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
      <p>{event.location}</p>
      <p className="mt-2">{event.description}</p>
      <select
        value={seatType}
        onChange={(e) => setSeatType(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="">Select Seat Type</option>
        <option value="Front">Front - {event.price_front} SR</option>
        <option value="Behind Goal">Behind Goal - {event.price_behind_goal} SR</option>
        <option value="Home Side">Home Side - {event.price_side_home} SR</option>
        <option value="Away Side">Away Side - {event.price_side_away} SR</option>
      </select>
      <button 
        onClick={handleAddToCart} 
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
