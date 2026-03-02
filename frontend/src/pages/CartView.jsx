import { useNavigate } from "react-router-dom";   
import { useCart } from "../Cartcontext/CartContext";

const CartView = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    totalItems,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useCart();

  const navigate = useNavigate();        

  if (!isCartOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const money = (n) =>
    new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
    }).format(n);

  // when user wants to continue shopping
  const handleAddMoreItems = () => {
    closeCart();

    // change this route to wherever restaurant / menu list is
    navigate("/restaurant-view");

  };

  // when user wants to go to checkout page
  const handleGoToCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Your Order</h2>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full border"
          >
            ×
          </button>
        </header>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white border rounded-md p-3 flex gap-3"
              >
                <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                )}

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {money(item.price)}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-7 h-7 border rounded-full flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-7 h-7 border rounded-full flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/*subtotal + buttons */}
        <div className="border-t bg-gray-500 px-4 py-4 text-white">
          <p className="text-sm mb-1">
            Selected Items : <strong>{totalItems}</strong>
          </p>
          <p className="text-sm mb-4">
            Item subtotal:{" "}
            <span className="font-semibold">{money(subtotal)}</span>
          </p>

        
          {/* Add more + Go to checkout */}
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleAddMoreItems}
              className="w-full rounded-full bg-slate-900 text-sky-400 text-sm font-semibold py-2 hover:bg-slate-800"
            >
              Add more items
            </button>
            <button
              type="button"
              onClick={handleGoToCheckout}
              className="w-full rounded-full bg-sky-500 text-black text-sm font-semibold py-2 hover:bg-sky-400"
            >
              Go to checkout
            </button>
          </div>

          {/* Clear cart*/}
          <button
            onClick={clearCart}
            className="mt-3 w-full border border-black text-white text-xs py-2 rounded hover:bg-gray-400"
          >
            Clear Cart
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartView;