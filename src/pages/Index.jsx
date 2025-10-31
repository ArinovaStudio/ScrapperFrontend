import React from 'react'
import { useState } from 'react';
import {RestaurantCard} from '../components/RestaurentCard.jsx';
import { useAppContext } from '../context/ContextProvider.jsx';

const Index = () => {
  const {data, setData} = useAppContext();
  const [loading, setLoading] = useState(false)
  const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
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
    console.log(response)
    setLoading(false)
  };
  return (
    <div className="grid grid-cols-2 h-screen">
        <div className="flex flex-col items-center justify-center p-10 from-gray-50 to-gray-100 min-h-screen border-r border-gray-200">
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
              {loading ? "Loading..." : "Start Scraping"}
            </button>
          </form>
        </div>

        <div className="overflow-y-scroll h-screen grid grid-cols-1 space-y-4 p-2 bg-gray-50">
          {data?.length > 0 ? (
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
  )
}

export default Index
