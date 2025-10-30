import React, { useState } from 'react';
import QuerySection from '../components/QuerySection';
import ResultSection from '../components/ResultSection';

/**
 * POST /research
 * Body: {
 *   "name": "Peter Luger Steak House",
 *   "location": "255 Northern Boulevard, Great Neck",
 *   "rating": 4.5,
 *   "userRatingsTotal": 3725,
 *   "placeId": "ChIJKXFLL-uJwokREGE5L-3oRxc"
 * }
 */
const ResearchPage = () => {

    const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN;
    const [showQuerySection, setShowQuerySection] = useState(false);
    const [showResultSection, setShowResultSection] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        rating: "",
        usersRatingTotal: "",
        placeId: "",
    })
    const [resultData, setResultData] = useState([]);


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name == "rating" ? parseFloat(value) : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Making request to the backend.
        // Here I have to add the formData to array.
        const data = { results: [formData] }
        fetch(`${backendOrigin}/research`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        })
            .then(async response => {
                if (!response.ok) {
                    console.error(`Something went wrong at the server ${response}`);
                }
                const responseJSON = await response.json();
                console.log("i am here.")
                console.log(responseJSON);
                setResultData(responseJSON.response);
                // Now we make to make the section block.
                setShowResultSection(true);
            })
            .catch(error => {
                console.error(`ERROR: Failed to do research ${error}`);
            })
    }

    const previewQuery = () => {
        setShowQuerySection(true);
    }

    return (
        <div className="w-screen h-screen bg-white flex flex-col items-center">

            <div className="w-[95%] mt-6 bg-[#F4F4F4] rounded-2xl shadow-sm border border-[#8EF477] flex flex-col justify-center px-10 py-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Do Research</h1>
                <span className="text-gray-600 text-lg mb-6">
                    Analyze any location with real-time data and intelligent insights.
                </span>


                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                            Place Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Peter Luger Steak House"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8EF477] focus:border-transparent"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="255 Northern Boulevard, Great Neck"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8EF477]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="rating" className="text-sm font-medium text-gray-700 mb-1">
                            Rating
                        </label>
                        <input
                            id="rating"
                            name="rating"
                            type="number"
                            step="0.1"
                            placeholder="4.5"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8EF477]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="usersRatingTotal" className="text-sm font-medium text-gray-700 mb-1">
                            User Ratings Total
                        </label>
                        <input
                            id="usersRatingTotal"
                            name="usersRatingTotal"
                            type="number"
                            placeholder="3725"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8EF477]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <label htmlFor="placeId" className="text-sm font-medium text-gray-700 mb-1">
                            Place ID
                        </label>
                        <input
                            id="placeId"
                            name="placeId"
                            type="text"
                            placeholder="ChIJKXFLL-uJwokREGE5L-3oRxc"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8EF477]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="md:col-span-2 flex flex-wrap gap-3 justify-start mt-4">

                        <button
                            type="button"
                            className="px-6 py-2 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                            onClick={previewQuery}
                        >
                            Preview Query
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#8EF477] text-gray-900 font-semibold rounded-lg shadow-md hover:bg-[#7ae865] hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                            Run (Simulate)
                        </button>

                        <button
                            type="button"
                            className="px-6 py-2 bg-[#E6F7E6] text-gray-800 border border-[#8EF477] font-medium rounded-lg shadow-sm hover:bg-[#d5f5d5] transition-all duration-200 cursor-pointer"
                        >
                            Export JSON
                        </button>

                        <button
                            type="reset"
                            className="px-6 py-2 bg-[#FEE2E2] text-red-600 border border-red-300 font-medium rounded-lg shadow-sm hover:bg-[#fecaca] transition-all duration-200 cursor-pointer"
                        >
                            Reset
                        </button>
                    </div>

                </form>
            </div>

            {showQuerySection && <QuerySection data={formData} />}
            {showResultSection && <ResultSection data={resultData} />}
        </div>
    )
}

export default ResearchPage
