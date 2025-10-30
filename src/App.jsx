import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetail";
import MyTickets from "./components/MyTickets";
import ResellForm from "./components/ResellForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/tickets" element={<MyTickets />} />
        <Route path="/resell/:id" element={<ResellForm />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
