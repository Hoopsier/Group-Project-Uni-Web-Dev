function UserProifleDataBoxCard({ number, label }) {
  return (
    <div className="border rounded-lg p-4 text-center shadow-md border-[#D1D5DC] w-48 h-40 flex flex-col items-center justify-center">
      <div className="text-5xl font-bold mb-2">{ number }</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

export default UserProifleDataBoxCard;
