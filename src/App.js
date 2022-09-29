import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//====3712c780====

const API_URL = "https://www.omdbapi.com?apikey=3712c780";
const movie1 = {
  Title: "Life Undefined",
  Year: "2020",
  imdbID: "tt10229024",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMWZmMzY5MjctMWVmMS00OTljLTgxYjgtZDhlNjYwNWJhNzRjXkEyXkFqcGdeQXVyNjExMDY4NTE@._V1_SX300.jpg",
};
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //create new function = async arrow func
  //that will accept search "title"
  const searchMovies = async (title) => {
    //use template string inside fetch
    //there we can specify the api url
    //this "response" is going to call our API
    const response = await fetch(`${API_URL}&s=${title}`);
    //once we got the response we will need to get d data from it
    const data = await response.json();

    setMovies(data.Search);
  };

  //call useEffect
  useEffect(() => {
    //calling search movie inside here,and put title as arg
    searchMovies("spiderman");
  }, []);
  return (
    <div className="app">
      <h1>Zen Movie</h1>

      <div className="search">
        <input
          placeholder="Search title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
