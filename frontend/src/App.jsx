import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import RestaurantView from "./pages/RestaurantView";
import SignUp from "./pages/SignUp";
import RestaurantRegister from "./pages/RestaurantRegister";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant-view" element={<RestaurantView />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurant-register" element={<RestaurantRegister />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

