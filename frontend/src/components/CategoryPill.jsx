export default function CategoryPill({ icon, label, isActive = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 select-none"
      aria-pressed={isActive}
    >
      <span
        className={[
          "grid place-items-center w-12 h-12 rounded-full border",
          isActive ? "border-black" : "border-gray-300",
        ].join(" ")}
      >
        <span className={isActive ? "text-black font-semibold" : "text-gray-500 font-semibold"}>
          {icon}
        </span>
      </span>

      <span className={isActive ? "text-black text-sm" : "text-gray-400 text-sm"}>
        {label}
      </span>
    </button>
  );
}
