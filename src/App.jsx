import { BrowserRouter, Route, Routes } from 'react-router';
import Index from './pages/Index.jsx';
import ResearchPage from './pages/ReasearchPage.jsx';
import GeminiPage from './pages/GeminiPage.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/gemini" element={<GeminiPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
