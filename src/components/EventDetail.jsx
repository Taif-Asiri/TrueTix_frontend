import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/EventDetails.css"

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [seatType, setSeatType] = useState("Front");
  const navigate = useNavigate();

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

    } catch (error) {

      console.error("Error adding to cart:", error);
      alert("❌ Failed to add to cart.");
    }
  };
  if (!event) return <p>Loading...</p>;

  return (
    <div 
      className="event-container"
      style={{
        backgroundImage: `url(${event.background_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "24px",
        borderRadius: "12px",
      }}
  >
      <h1 className="event-title">{event.name}</h1>
      <p className="event-date">{new Date(event.date).toLocaleString()}</p>
      <p className="event-location">{event.location}</p>
      <p className="event-description">{event.description}</p>

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
        className="add-button"
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
