import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import MyTickets from "./components/MyTickets";
import ResellForm from "./components/ResellForm";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Verify from "./components/Verify";
import HomePage from "./pages/Home";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute"
import UserProfile from "./components/UserProfile";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/resell/:id" element={<ResellForm />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/profile" element={<UserProfile />} />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          }
          />
        <Route
          path="/resell"
          element={
            <ProtectedRoute>
              <ResellForm />
            </ProtectedRoute>
          }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>  
  );
}


export default App;
