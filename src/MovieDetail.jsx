import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetail.css";

const API_URL = "https://www.omdbapi.com/?apikey=43eb1c0&i=";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(API_URL + id);
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie details not found.");
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!movie) return <p className="loading-message">Loading...</p>;

  return (
    <div className="movie-detail">
      <div className="movie-detail-container">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="movie-poster-large"
        />
        <div className="movie-info">
          <h2>
            {movie.Title} ({movie.Year})
          </h2>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <Link to="/" className="back-button">
            ← Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}
