import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "./MovieContext";
import "./MovieSearch.css";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=43eb1c0&s=";

function MovieSearch() {
  const { movies, setMovies, query, setQuery } = useContext(MovieContext);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    if (!query) return;
    setError(null);
    try {
      const response = await fetch(API_URL + query);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("No movies found. Please try a different search.");
      }
    } catch (err) {
      setError("Failed to fetch movies. Try again later.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">🎬 Movie Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={searchMovies} className="search-button">
          Search
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="movies-grid">
        {movies.length > 0
          ? movies.map((movie) => (
              <Link
                to={`/movie/${movie.imdbID}`}
                key={movie.imdbID}
                className="movie-card"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                  className="movie-poster"
                />
                <h2 className="movie-title">{movie.Title}</h2>
                <p className="movie-year">{movie.Year}</p>
              </Link>
            ))
          : !error && (
              <p className="no-results">Start searching for movies above.</p>
            )}
      </div>
    </div>
  );
}

export default MovieSearch;
