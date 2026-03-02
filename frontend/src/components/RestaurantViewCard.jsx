import React from "react";

const RestaurantViewCard = ({ restaurant }) => {
  const {
    name,
    tags,
    rating,
    eta,
    price,
    status,
    opensAt,
    showSchedule,
    image,        // use "image" key instead of "Image"
  } = restaurant;

  return (
    <article className="w-full sm:w-80 bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden">
      {/* Status bar */}
      <div className="flex justify-between items-center bg-black text-xs font-semibold px-4 py-2 border-b border-neutral-700">
        <span>{status}</span>
        <span className="font-normal text-neutral-300">
          Opens at {opensAt}
        </span>
      </div>

      {/* Image */}
      <div className="h-40 bg-neutral-800 border-b border-neutral-700">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-4xl text-neutral-600">
            ✕
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-4 space-y-2 text-sm text-white">
        <h3 className="font-semibold text-base">{name}</h3>
        <p className="text-neutral-400 text-xs">{tags}</p>

        <div className="flex items-center gap-3 text-xs text-neutral-300 mt-2">
          <span>★ {rating}</span>
          <span className="flex items-center gap-1">⏱ {eta}</span>
          <span className="ml-auto">{price}</span>
        </div>
      </div>

      {/* CTA */}
      {showSchedule && (
        <div className="border-t border-neutral-700 px-4 py-3">
          <button className="w-full text-xs font-semibold border border-white py-2 hover:bg-white hover:text-black transition">
            Schedule Order
          </button>
        </div>
      )}
    </article>
  );
};

export default RestaurantViewCard;
