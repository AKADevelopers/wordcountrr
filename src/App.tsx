import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import TextEditor from './components/TextEditor';
import HistoryPage from './pages/HistoryPage';
import TextCompare from './components/TextCompare';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import WebsiteCounterPage from './pages/WebsiteCounterPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Toaster position="top-right" />
        <Header />
        <main className="flex-grow pt-6 pb-16">
          <Routes>
            <Route path="/" element={<TextEditor />} />
            <Route path="/text-editor" element={<TextEditor />} />
            <Route path="/compare" element={<TextCompare />} />
            <Route path="/website-counter" element={<WebsiteCounterPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
