import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Main from "./Components/Main";
import Logo from "./Components/Logo";
import Search from "./Components/Search";
import NumResults from "./Components/NumResults";
import Box from "./Components/Box";
import MovieList from "./Components/MovieList";
import WatchedSummary from "./Components/WatchedSummary";
import Button from "./Components/Button";
import StarRating from "./Components/StarRating";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import MovieDetail from "./Components/MovieDetail";
import WatchedList from "./Components/WatchedList";
import EmptySearch from "./Components/EmptySearch";

export const KEY = "1364625b";

export default function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [practice, usePractice] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((previd) => (previd === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleClearSearch = () => {
    setQuery("");
    handleCloseMovie();
  };

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!response.ok) {
            throw new Error("🥲 Something wrong");
          }
          const data = await response.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
          console.log(data.Search);
          setIsLoading(false);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
        // if (query > 3) {
        //   setMovies([]);
        //   setError("");
        //   return;
        // }
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <div className="right-side">
          <Search query={query} setQuery={setQuery} />
          <Button onClick={handleClearSearch}>Clear</Button>
        </div>
        {/* <NumResults movies={movies} /> */}
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {error && <EmptySearch />}
          {movies === 0 ? <EmptySearch /> : ""}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              handleSelectMovie={handleSelectMovie}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          )}
          {/* <StarRating maxRating={7} color={"#FA9E34"} size={"0 0 20 20"} /> */}
        </Box>
      </Main>
    </>
  );
}
