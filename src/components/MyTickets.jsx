
import React, { useEffect, useState } from "react";
import api from "../api/api";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newSeatType, setNewSeatType] = useState("");


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
  const handleEdit = (id, currentSeatType) => {
    setEditingId(id);
    setNewSeatType(currentSeat || "");
  };

  const handleUpdate = async (id) => {
    try {
      await api.patch(`tickets/${id}/`, { seat_type: newSeatType });
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id ? { ...ticket, seat_type: newSeatType } : ticket
        )
      );
      setMessage("✅ Seat updated successfully.");
      setEditingId(null);
      setNewSeatType("");
    } catch (err) {
      console.error("Error updating seat:", err);
      setMessage("❌ Failed to update seat.");
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎟️ My Tickets</h2>
      {message && (
        <p className="text-green-600 font-semibold mb-4">{message}</p>
      )}

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

                {editingId === ticket.id && (
                  <div className="mt-2 flex gap-2">
                    <select
                      value={newSeatType}
                      onChange={(e) => setNewSeatType(e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="Front">Front</option>
                      <option value="Behind Goal">Behind Goal</option>
                      <option value="Home Side">Home Side</option>
                      <option value="Away Side">Away Side</option>
                    </select>

                    <button
                      onClick={() => handleUpdate(ticket.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-sm text-gray-400 hover:text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(ticket.id, ticket.seat)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
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
  );
}

export default MyTickets;
