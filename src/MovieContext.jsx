import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <MovieContext.Provider value={{ movies, setMovies, query, setQuery }}>
      {children}
    </MovieContext.Provider>
  );
};
