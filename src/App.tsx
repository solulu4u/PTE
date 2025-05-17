import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import IELTSPage from './pages/ielts/IELTSPage';
import PTEPage from './pages/pte/PTEPage';
import HSKPage from './pages/hsk/HSKPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ielts/*" element={<IELTSPage />} />
            <Route path="/pte/*" element={<PTEPage />} />
            <Route path="/hsk/*" element={<HSKPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;