import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// NEW pages
import RestaurantPage from "./pages/RestaurantPage";
import MerchantLanding from "./pages/MerchantLanding";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
        <Route path="/merchants" element={<MerchantLanding />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
