import React, { useEffect, useState } from "react";
import api from "../api/api";
// import ResellForm from "../components/ResellForm"
// import Navbar from "../components/NavBar";

function MyTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("tickets/");
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4"> My Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold">{ticket.event_name}</h3>
              <p>Price: {ticket.event_price} SR</p>
              <p>Status: {ticket.is_active ? "Active" : "Used"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyTickets;
