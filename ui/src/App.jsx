import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import PatrimoinePage from './pages/PatrimoinePage.jsx';
import PossessionListPage from './pages/PossessionListPage.jsx';
import CreatePossessionPage from './pages/CreatePossessionPage.jsx';
import UpdatePossessionPage from './pages/UpdatePossessionPage.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/patrimoine" element={<PatrimoinePage />} />
        <Route path="/possession" element={<PossessionListPage />} />
        <Route path="/possession/create" element={<CreatePossessionPage />} />
        <Route path="/possession/:libelle/update" element={<UpdatePossessionPage />} />
        <Route path="/" element={<h1>Welcome to the Application</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
