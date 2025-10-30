import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}/`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
      <p>{event.location}</p>
      <p className="mt-2">{event.description}</p>
    </div>
  );
}

export default EventDetails;
