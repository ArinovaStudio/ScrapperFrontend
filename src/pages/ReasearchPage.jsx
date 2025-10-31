import React, { useEffect, useState } from "react";
import QuerySection from "../components/QuerySection";
import ResultSection from "../components/ResultSection";
import { useLocation } from "react-router";

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
  const { state: place } = useLocation();

  console.log(place);
  const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN;
  const [showResultSection, setShowResultSection] = useState(false);
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const data = { results: [place] };
    fetch(`${backendOrigin}/research`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          console.error(`Something went wrong at the server ${response}`);
        }
        const responseJSON = await response.json();
        console.log("i am here.");
        console.log(responseJSON);
        setResultData(responseJSON.response);
        // Now we make to make the section block.
        setShowResultSection(true);
      })
      .catch((error) => {
        console.error(`ERROR: Failed to do research ${error}`);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
      {showResultSection && <ResultSection data={resultData} />}
    </div>
  );
};

export default ResearchPage;
