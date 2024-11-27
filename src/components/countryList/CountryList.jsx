// src/components/CountryList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CountryList.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries from backend
    axios
      .get('http://localhost:3000/api/countries')
      .then((response) => {
        setCountries(response.data.countries);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de países:', error.message);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Lista de Países</h1>
      <ul className="countryList">
        {countries.map((country) => (
          <li key={country.countryCode} className="countryItem">
            <Link to={`/country/${country.countryCode}/${country.name}`} className="link">
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  
  );
};

export default CountryList;
