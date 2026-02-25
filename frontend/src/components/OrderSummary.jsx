const OrderSummary = ({
  subtotal = 0,
  delivery = 2.99,
  taxRate = 0.1,
  currency = "EUR",
}) => {
  const tax = subtotal * taxRate;
  const total = subtotal + delivery + tax;

  const money = (n) =>
    new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency,
    }).format(n);

  const handleProceed = () => {
    // FRONTEND ONLY for now
    alert("Proceed to Payment clicked! Backend will be added later.");
  };

  const isEmpty = subtotal === 0;

  return (
    <aside className="border border-gray-700 bg-gray-300 shadow-sm h-fit p-4 sm:p-5">
      <h2 className="text-sm sm:text-base font-semibold mb-4">Order Summary</h2>

      {isEmpty ? (
        <p className="text-xs sm:text-sm text-gray-500 mb-6">Cart is empty</p>
      ) : (
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Review your order before paying
        </p>
      )}

      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{money(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{money(delivery)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>{money(tax)}</span>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between text-sm sm:text-base font-semibold">
        <span>Total</span>
        <span>{money(total)}</span>
      </div>

      <button
        type="button"
        onClick={handleProceed}
        className="w-full mt-4 py-2 sm:py-2.5 text-sm sm:text-base font-medium bg-black text-white hover:bg-gray-900 transition"
      >
        Proceed to Payment
      </button>
    </aside>
  );
};

export default OrderSummary;