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