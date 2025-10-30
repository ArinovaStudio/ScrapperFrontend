import { useState } from "react";

const ScrapNearbyLocation = () => {

  const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN;
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const type = form.type.value;
    const location = form.location.value;
    const limit = form.limit.value;

    const response = await fetch(`${backendOrigin}/scrap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, location, limit: parseInt(limit) }),
    });

    const places = await response.json();
    setData(places.results);
  };
  console.log(data);

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen border-r border-gray-200">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-gray-100"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Data Scraper
              </h2>
              <p className="text-gray-500 text-sm">
                Configure your scraping parameters
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder="Enter type..."
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter location..."
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Limit
                </label>
                <input
                  type="number"
                  name="limit"
                  defaultValue={10}
                  min="1"
                  max="100"
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              Start Scraping
            </button>
          </form>
        </div>

        <div className="overflow-y-scroll h-screen grid grid-cols-1 space-y-4 p-2 bg-gray-50">
          {data.length > 0 ? (
            data.map((place) => (
              <RestaurantCard key={place.id} restaurant={place} />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-2xl font-semibold text-gray-600 text-center">
                No data available. Please submit the form to start scraping.
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const RestaurantCard = ({ restaurant }) => {
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

        <button className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition duration-150">
          Analysis
        </button>
      </div>
    </div>
  );
};

export default ScrapNearbyLocation;
