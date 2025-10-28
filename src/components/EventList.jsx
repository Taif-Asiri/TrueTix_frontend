import React, { useEffect, useState } from "react";
import API from "../api/api";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("events/")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []); 
}
