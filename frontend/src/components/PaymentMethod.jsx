const PaymentMethod = ({ method, setMethod }) => {
  return (
    <div className="border border-gray-700 bg-gray-300 shadow-sm">
      <div className="border-b border-gray-300 px-4 py-3">
        <h2 className="text-sm sm:text-base font-semibold">Payment Method</h2>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setMethod("credit")}
            className={`border px-3 py-2 text-xs sm:text-sm text-left transition ${
              method === "credit"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 hover:border-black"
            }`}
          >
            Credit Card
          </button>

          <button
            type="button"
            onClick={() => setMethod("debit")}
            className={`border px-3 py-2 text-xs sm:text-sm text-left transition ${
              method === "debit"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 hover:border-black"
            }`}
          >
            Debit Card
          </button>

          <button
            type="button"
            onClick={() => setMethod("cod")}
            className={`border px-3 py-2 text-xs sm:text-sm text-left transition ${
              method === "cod"
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 hover:border-black"
            }`}
          >
            Cash on Delivery
          </button>
        </div>

        {method !== "cod" && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card Number (16 digits)"
              className="w-full border border-gray-700 bg-white px-3 py-2 text-sm outline-none focus:border-black"
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full border border-gray-700 bg-white px-3 py-2 text-sm outline-none focus:border-black"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                className="border  border-gray-700 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="CVV"
                className="border border-gray-700 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;