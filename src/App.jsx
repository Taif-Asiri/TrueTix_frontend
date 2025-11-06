import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import MyTickets from "./components/MyTickets";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Verify from "./components/Verify";
import HomePage from "./components/Home";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute"
import CartPage from "./components/CartPage";
import { AuthProvider } from "./context/AuthContext";
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/cart" element={<CartPage />} />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          }
          />
        {/* <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
          /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>  
  );
}


export default App;
