export default function RestaurantCardSkeleton() {
  return (
    <div className="border border-gray-200 bg-white w-full animate-pulse">
      <div className="h-36 bg-gray-100 border-b border-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-100 w-2/3" />
        <div className="h-3 bg-gray-100 w-1/2 mt-2" />
        <div className="flex justify-between mt-4">
          <div className="h-3 bg-gray-100 w-24" />
          <div className="h-3 bg-gray-100 w-12" />
        </div>
      </div>
    </div>
  );
}