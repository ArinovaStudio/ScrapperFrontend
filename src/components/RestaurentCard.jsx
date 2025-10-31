import { Link } from "react-router";

export const RestaurantCard = ({ restaurant }) => {
  // Determine status text and color
  const statusText = restaurant.openNow ? "Open" : "Closed";
  const statusColor = restaurant.openNow
    ? "text-green-600 bg-green-100"
    : "text-red-600 bg-red-100";

  // Format phone number and URL links
  const phoneNumber =
    restaurant.phone && restaurant.phone !== "Not available" ? (
      <a
        href={`tel:${restaurant.phone}`}
        className="text-blue-500 hover:text-blue-700"
      >
        {restaurant.phone}
      </a>
    ) : (
      <span className="text-gray-400">Not available</span>
    );

  const websiteUrl =
    restaurant.url && restaurant.url !== "Not available" ? (
      <a
        href={restaurant.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 truncate"
      >
        {restaurant.url.replace(/(^\w+:|^)\/\//, "")}
      </a>
    ) : (
      <span className="text-gray-400">Not available</span>
    );

  const price =
    restaurant.startingPrice && restaurant.startingPrice !== "Not available"
      ? `₹${restaurant.startingPrice} onwards`
      : "Price N/A";

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col">
      {/* Header: Name, Rating, and Status */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-gray-800 leading-tight pr-4">
          {restaurant.name}
        </h3>
        <div
          className={`py-1 px-3 rounded-full text-xs font-semibold uppercase ${statusColor}`}
        >
          {statusText}
        </div>
      </div>

      <div className="space-y-3 flex-grow">
        {/* Rating and Reviews */}
        <div className="flex items-center text-sm">
          <span className="text-yellow-500 text-lg mr-2">⭐</span>
          <span className="font-bold text-gray-700">{restaurant.rating}</span>
          <span className="text-gray-500 ml-2">
            ({restaurant.userRatingsTotal.toLocaleString()} ratings)
          </span>
        </div>

        {/* Price and Address */}
        <p className="text-md text-gray-700">
          <span className="font-semibold text-green-700 mr-2">Cost:</span>
          {price}
        </p>
        <p className="text-sm text-gray-600 italic">{restaurant.address}</p>

        {/* Contact and Website */}
        <div className="text-sm">
          <span className="font-semibold text-gray-700 mr-2">Call:</span>
          {phoneNumber}
        </div>
        <div className="text-sm">
          <span className="font-semibold text-gray-700 mr-2">Web:</span>
          {websiteUrl}
        </div>
      </div>

      {/* Footer: Map Link */}
      <div className="mt-4 flex  gap-3  pt-4 border-t border-gray-100">
        <a
          href={restaurant.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition duration-150"
        >
          View on Map
        </a>

        <Link to={"/research"} state={restaurant} className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition duration-150">
          Analysis
        </Link>
      </div>
    </div>
  );
};