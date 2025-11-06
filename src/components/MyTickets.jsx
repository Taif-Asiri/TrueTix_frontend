
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await api.get("tickets/");
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`tickets/${id}/`);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      setMessage("✅ Ticket deleted successfully.");
    } catch (err) {
      console.error("Error deleting ticket:", err);
      setMessage("❌ Failed to delete ticket.");
    }
  };
const handleRedirectToResell = async (ticket) => {
  // Calculate the new price with a 20% increase
  const newPrice = parseFloat(ticket.event_price) * 1.2;

  // Show confirmation message to the user
  const confirmed = window.confirm(
    `Are you sure you want to resell the ticket for "${ticket.event_name}"?\n` +
    `The resale price will be automatically set to ${newPrice.toFixed(2)} SR (20% increase).`
  );

  if (!confirmed) return;

  try {
    // Send the resale request to the backend
    await api.post("/resell/", {
      ticket: ticket.id,
      price: newPrice.toFixed(2),
    });

    alert("✅ Ticket listed for resale successfully!");
    fetchTickets(); // Refresh the ticket list to reflect changes
  } catch (error) {
    console.error("Error reselling ticket:", error);
    alert("❌ Something went wrong while trying to resell the ticket.");
  }
};
 
  
  return (
    <>
    <Navbar/>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎟️ My Tickets</h2>
      {message && 
        <p className="text-green-600 font-semibold mb-4">{message}</p>}

      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{ticket.event_name}</h3>
                <p>Price: {ticket.event_price} SR</p>
                <p>Status: {ticket.is_active ? "Active" : "Used"}</p>
                <p>Seat: {ticket.seat || "Not assigned"}</p>
                <p>Resell: {ticket.is_resell ? "Yes" : "No"}</p>
                {ticket.is_active && !ticket.is_resell && (
                  <button
                    onClick={() => handleRedirectToResell(ticket)}
                    className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    List for Resale
                  </button>
                )}
                {ticket.is_resell && (
                  <p className="mt-2 text-sm text-yellow-600 font-semibold">
                    Listed for Resale
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}

export default MyTickets;
