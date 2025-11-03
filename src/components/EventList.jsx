import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import API from "../api/api";
import Navbar from "../components/NavBar";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events/")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []); 
 return (
    <>
    <Navbar />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-3 border-b pb-2">
            <Link to={`/events/${event.id}`} className="text-blue-600 hover:underline">
              <h2 className="text-lg font-semibold">{event.name}</h2>
            </Link>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default EventList;
