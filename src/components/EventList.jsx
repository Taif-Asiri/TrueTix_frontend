import React, { useEffect, useState } from "react";
import API from "../api/api";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("events/")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []); 
 return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-3 border-b pb-2">
            <h2 className="text-lg font-semibold">{event.name}</h2>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
