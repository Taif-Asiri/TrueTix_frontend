import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function ResellForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/transfers/", {
        ticket: id,
        price: price,
      });
      console.log("Resell created:", response.data);
      alert("Ticket listed for resale successfully!");
      navigate("/tickets");
    } catch (error) {
      console.error("Error creating transfer:", error);
      alert("Error listing ticket for resale.");
    }
  };
}