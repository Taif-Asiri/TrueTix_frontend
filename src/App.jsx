import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import MyTickets from "./components/MyTickets";
import MyTickets from "./components/ResellForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/" element={<MyTickets />} />
        <Route path="/" element={<ResellForm />} />
      </Routes>
    </Router>
  );
}

export default App;
