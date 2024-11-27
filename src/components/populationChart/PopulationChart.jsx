import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './PopulationChart.css';
import { ProgressBar } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'font-awesome/css/font-awesome.min.css';


const PopulationChart = () => {
  const { countryCode, countryName } = useParams();
  const [countryData, setCountryData] = useState({
    borders: [],
    dataPopulation: [],
    countryFlag: ''
  });
  const [charging, setCharging] = useState(true); 

  useEffect(() => {
    setCharging(true); 
    axios
      .get(`http://localhost:3000/api/country/${countryCode}?countryName=${countryName}`) 
      .then((response) => {
        const { borderCountries, dataPopulation, countryFlag } = response.data;
        setCountryData({ borders: borderCountries, dataPopulation, countryFlag });
        setCharging(false); 
      })
      .catch((error) => {
        setCharging(false); 
        console.error('Error al obtener la información del país:', error.message);
      });
  }, [countryCode, countryName]); 

  return (
    <div>
      {charging && (
        <div style={{ marginTop: '20px', width: '100%' }}>
          <ProgressBar  animated now={100} label="Charging" /> 
        </div>
      )}

      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <i className="fa fa-home" style={{ fontSize: '24px', marginRight: '10px' }}></i>
        <span>Inicio</span>
      </Link>

      <div id="title">
        <h1>Información de {countryName}</h1>
        <img
          src={countryData.countryFlag}
          alt={`Bandera de ${countryName}`}
          style={{ width: '200px', height: 'auto' }}
        />
      </div>

      <h2>Fronteras</h2>
      <ul>
        {countryData.borders.map((border) => (
          <li key={border} className="border">
            {border}
          </li>
        ))}
      </ul>

      <h2>Población Histórica</h2>
      <ul class='population'>
        {countryData.dataPopulation.map((population) => (
          <li key={population.year}>
            <span>{population.year}:</span> {population.value.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopulationChart;
