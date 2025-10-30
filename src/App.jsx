import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router"
import ScrapNearbyLocation from './pages/ScrapNearbyLocation'
import ResearchPage from './pages/ResearchPage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ScrapNearbyLocation />} />
                <Route path="/research" element={<ResearchPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App