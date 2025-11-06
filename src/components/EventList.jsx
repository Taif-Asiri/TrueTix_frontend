import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../api/api";
import Navbar from "../components/NavBar";
import "../styles/EventList.css"

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get("events/")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []); 
 return (
    <>
      <Navbar />
      <div className="event-list-container">
        {events.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => navigate(`/events/${event.id}`)}
              style={{
                backgroundImage: `url(${event.background_url})`,
                backgroundSize: "100%",
                backgroundPosition: "center",
                color: "white",
                padding: "24px",
                borderRadius: "12px",
                height: "200px",
                
              }}
        
            >
                <div className="hover-text">Match details</div>        
        </div>
        ))}
      </div>
    </>
  );
}
