// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";



// function ResellForm() {
//   const [tickets, setTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [resellPrice, setResellPrice] = useState(""); 
//   const navigate = useNavigate();

//  useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const res = await API.get("tickets/");
//         setTickets(res.data);
//       } catch (err) {
//         console.error("Error fetching tickets:", err);
//       }
//     };
//     fetchTickets();
//   }, []);

//   const handleSelectTicket = (ticket) => {
//     setSelectedTicket(ticket);
//     const newPrice = parseFloat(ticket.event_price) * 1.2; 
//     setResellPrice(newPrice.toFixed(2));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedTicket) return alert("Please select a ticket to resell.");
    
//     try {
//       const response = await API.post("/transfers/", {
//         ticket: selectedTicket.id,
//         price: parseFloat(resellPrice),

//       });
//       alert("Ticket listed for resale successfully!");
//       navigate("/tickets");
//     } catch (error) {
//       console.error("Error creating transfer:", error);
//       alert("Error listing ticket for resale.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-xl font-bold mb-4 text-center">Resell Your Ticket</h2>
//       {tickets.length === 0 ? (
//         <p className="text-gray-500 text-center">No tickets available.</p>
//       ) : (     
//         <form onSubmit={handleSubmit}>
//           <label className="block mb-2 font-semibold">Select Ticket:</label>
//           <select
//             onChange={(e) =>
//               handleSelectTicket(tickets.find((t) => t.id === parseInt(e.target.value)))
//             }
//             className="border p-2 w-full mb-4 rounded"
//           >
//             <option value="">-- Choose a ticket --</option>
//             {tickets.map((t) => (
//               <option key={t.id} value={t.id}>
//                 {t.event_name} - Original: {t.event_price} SR
//               </option>
//             ))}
//           </select>

//           {selectedTicket && (
//             <>
//               <p className="mb-3 text-gray-700">
//                   Resell Price (20% increase): <strong>{resellPrice} SR</strong>
//               </p>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//               >
//                 Confirm Resell
//               </button>
//             </>
//           )}
//         </form>
//       )}
//     </div>
//   );
// }

// export default ResellForm;
