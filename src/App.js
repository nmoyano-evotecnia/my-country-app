import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './components/countryList/CountryList';
import PopulationChart from './components/populationChart/PopulationChart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:countryCode/:countryName" element={<PopulationChart />} />
      </Routes>
    </Router>
  );
}

export default App;
