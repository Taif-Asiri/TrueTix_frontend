import React, { useEffect, useState } from "react";
import API from "../api/api";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

 
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await API.get("/tickets/");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }; }
  const handleResellClick = (ticket) => {
    setSelectedTicket(ticket);
  };


  const handleResellComplete = () => {
    setSelectedTicket(null);
    fetchTickets(); 
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4"> My Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul className="space-y-3">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
            >
              <div>
                 </li>
          ))}
        </ul>