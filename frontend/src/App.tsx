import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NewQuote from "./pages/NewQuote";
import Quotes from "./pages/Quotes";
import QuoteEstimatePage from "./pages/QuoteEstimatePage";

export default function App() {
  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Quotes />} />
            <Route path="/devis" element={<NewQuote />} />
            <Route path="/devis/:id" element={<QuoteEstimatePage />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </div>
  );
}
