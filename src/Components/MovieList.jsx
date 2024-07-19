import { useState } from "react";
import Movie from "./Movie";

export default function MovieList({ movies, handleSelectMovie, onCloseMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={handleSelectMovie}
        />
      ))}
    </ul>
  );
}
