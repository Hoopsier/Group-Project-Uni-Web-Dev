import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import RestaurantView from "./pages/RestaurantView";
import SignUp from "./pages/SignUp";
import RestaurantRegister from "./pages/RestaurantRegister";
import UserProfile from "./pages/UserProfile";
import Checkout from "./pages/Checkout";
import CartView from "./pages/CartView";
import { CartProvider } from "./Cartcontext/CartContext";
import RestaurantPage from "./pages/RestaurantPage";
function App() {
  return (
  <CartProvider>
    <Router>
      <Navbar />
      <CartView />
      <Routes>
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant-view" element={<RestaurantView />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurant-register" element={<RestaurantRegister />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;

