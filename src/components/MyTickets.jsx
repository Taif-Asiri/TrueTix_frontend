import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../styles/MyTickets.css";

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
    const newPrice = parseFloat(ticket.event_price) * 1.2;
    const confirmed = window.confirm(
      `Are you sure you want to resell the ticket for "${ticket.event_name}"?\n` +
        `The resale price will be automatically set to ${newPrice.toFixed(2)} SR (20% increase).`
    );

    if (!confirmed) return;

    try {
      await api.post("/resell/", {
        ticket: ticket.id,
        price: newPrice.toFixed(2),
      });

      alert("✅ Ticket listed for resale successfully!");
      fetchTickets();
    } catch (error) {
      console.error("Error reselling ticket:", error);
      alert("❌ Something went wrong while trying to resell the ticket.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="tickets-container">
        <h2 className="page-title">🎟️ My Tickets</h2>
        {message && <p className="message">{message}</p>}

        {tickets.length === 0 ? (
          <p className="no-tickets">No tickets found.</p>
        ) : (
          <div className="tickets-grid">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="ticket-card"
                style={{
                  backgroundImage: `url(http://localhost:8000/media/${ticket.event_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  padding: "24px",
                  borderRadius: "12px",

                }}
              >
                <div className="ticket-overlay">
                  <h3>{ticket.event_name}</h3>
                  <p>Price: {ticket.event_price} SR</p>
                  <p>Status: {ticket.is_active ? "Active" : "Used"}</p>
                  <p>Seat: {ticket.seat || "Not assigned"}</p>
                  <p>Resell: {ticket.is_resell ? "Yes" : "No"}</p>

                  {ticket.is_active && !ticket.is_resell && (
                    <button
                      onClick={() => handleRedirectToResell(ticket)}
                      className="resell-button"
                    >
                      List for Resale
                    </button>
                  )}

                  {ticket.is_resell && (
                    <p className="resell-label">Listed for Resale</p>
                  )}

                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyTickets;