import React, { useEffect, useState } from "react";
import axios from "../api/api";
import ResellForm from "../components/ResellForm"

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

 
  useEffect(() => {

    const fetchTickets = async () => {
     try {
        const token = localStorage.getItem("access");
        const res = await axios.get("http://127.0.0.1:8000/api/tickets/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);
 const handleResellClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleResellComplete = () => {
    setSelectedTicket(null);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
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
                <p className="font-semibold">{ticket.event_name}</p>
                <p className="text-sm text-gray-600">
                  QR: {ticket.qr_code} | Active: {ticket.is_active ? "Yes" : "No"}
                </p>
              </div>
            <button
                onClick={() => handleResellClick(ticket)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Resell
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedTicket && (
        <ResellForm
          ticket={selectedTicket}
          onResellComplete={handleResellComplete}
        />
      )}
    </div>
  );
}

export default TicketList;