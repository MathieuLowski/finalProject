import React, { createContext, useState, useEffect } from "react";

export const TourContext = createContext(null);

export const TourProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("/searchBar")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.dbResult);
        //const cities = Object.values(data);
        //console.log("cities", cities);
        setSuggestions(data.dbResult);
      });
  }, []);

  return (
    <TourContext.Provider value={{ suggestions, setSuggestions }}>
      {children}
    </TourContext.Provider>
  );
};

export default TourProvider;
