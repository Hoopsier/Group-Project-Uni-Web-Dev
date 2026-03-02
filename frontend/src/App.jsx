import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import RestaurantView from "./pages/RestaurantView";
import SignUp from "./pages/SignUp";
import RestaurantRegister from "./pages/RestaurantRegister";
import RestaurantPage from "./pages/RestaurantPage";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />


        <Route path="/login" element={<Login />} />
        <Route path="/restaurant-view" element={<RestaurantView />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurant-register" element={<RestaurantRegister />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

