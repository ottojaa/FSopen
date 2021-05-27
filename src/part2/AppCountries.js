import axios from "axios";
import React, { useEffect, useState } from "react";

const SingleCountry = ({ country }) => {
  const name = country.name;
  const languages = country.languages;
  const capital = country.capital;

  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img style={{ maxHeight: 100, maxWidth: 100 }} src={country.flag}></img>
    </div>
  );
};

const Countries = ({ filter, countries }) => {
  const [openStates, setOpenStates] = useState([]);
  const countriesToShow = countries.filter((country) => country.name.toUpperCase().includes(filter.toUpperCase()));
  const tenOrMore = countriesToShow.length >= 10;
  const moreThanOneButLessThanTen = countriesToShow.length > 1 && countriesToShow.length < 10;
  const oneCountry = countriesToShow.length === 1;
  const handleClickShow = (e, name) => {
    e.preventDefault();
    setOpenStates([...openStates, name]);
  };

  const handleClickHide = (e, name) => {
    e.preventDefault();
    setOpenStates(openStates.filter((state) => state.name === !name));
  };

  if (tenOrMore) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (moreThanOneButLessThanTen) {
    return (
      <ul>
        {countriesToShow.map((country, i) => (
          <li key={country.name}>
            <div style={{ display: "flex" }}>
              {country.name}
              {openStates.includes(country.name) ? (
                <div>
                  <SingleCountry country={country} />
                  <button style={{ marginBottom: "30px" }} onClick={(e) => handleClickHide(e, country.name)}>
                    Show
                  </button>
                </div>
              ) : (
                <button onClick={(e) => handleClickShow(e, country.name)}>Show</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  if (oneCountry) {
    const c = countriesToShow[0];
    return <SingleCountry country={c} />;
  }
  return null;
};

const AppCountries = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <h1>Filter countries</h1>

      <div>
        filter countries <input value={filter} onChange={(e) => setFilter(e.target.value)}></input>
      </div>

      <Countries countries={countries} filter={filter} />
    </div>
  );
};

export default AppCountries;
