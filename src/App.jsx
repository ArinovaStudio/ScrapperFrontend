import { BrowserRouter, Route, Routes } from 'react-router';
import Index from './pages/Index.jsx';
import ResearchPage from './pages/ReasearchPage.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/research" element={<ResearchPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
