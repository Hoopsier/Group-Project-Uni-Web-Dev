import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryAddress from "../components/DeliveryAddress";
import PaymentMethod from "../components/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useCart } from "../Cartcontext/CartContext";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zip: "",
    instructions: "",
  });

  const { cartItems } = useCart();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();
  
  return (
    <main className="bg-gray-50">
    <div className="mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Back button + title */}
        <div className="flex items-center gap-4 mb-8">
          <button type="button"onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black
        hover:bg-gray-100 transition">
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-2xl sm:text-2xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 lg:gap-10">
          <section className="space-y-6">
            <DeliveryAddress value={address} onChange={setAddress} />
            <div id="payment-section">
              <PaymentMethod
                method={paymentMethod}
                setMethod={setPaymentMethod}
              />
            </div>

            <div className="border border-gray-700 bg-gray-300 shadow-sm">
              <div className="border-b border-gray-300 px-4 py-3">
                <h2 className="text-sm sm:text-base font-semibold">
                  Delivery Notes
                </h2>
              </div>
              <div className="p-4 sm:p-5">
                <textarea
                  placeholder="E.g. Ring doorbell twice, blue house..."
                  rows={3}
                  className="w-full border  border-gray-700 bg-white px-3 py-2 text-sm outline-none resize-none focus:border-black"
                />
              </div>
            </div>

            {/* Terms & Conditions*/}
            <div className="border border-gray-300 bg-white shadow-sm px-4 py-3">
              <label className="flex items-start gap-3 text-xs sm:text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-black"
                />
                <span>
                  I agree to the{" "}
                  <span className="underline">Terms &amp; Conditions</span> and{" "}
                  <span className="underline">Privacy Policy</span>
                </span>
              </label>
            </div>
          </section>

          <OrderSummary
              subtotal={subtotal}
              currency="EUR"
              onProceed={(order) => {
              console.log("Proceed clicked:", order);
                alert("Proceed clicked! Backend will be connected later.");
              }}/>
        </div>
      </div>
    </main>
  );
};

export default Checkout;