import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import MyTickets from "./components/MyTickets";
import ResellForm from "./components/ResellForm";
import LoginPage from "./components/LoginPage";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import { AuthProvider } from "./context/AuthContext";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/resell/:id" element={<ResellForm />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>  
  );
}


export default App;
