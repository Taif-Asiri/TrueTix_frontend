import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import MyTickets from "./components/MyTickets";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/" element={<MyTickets />} />
      </Routes>
    </Router>
  );
}

export default App;
