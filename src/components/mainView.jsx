import { useState, useEffect } from "react";
import { movies } from "../../assets/movies";
import { MovieCard } from "./movieCard";
import { MovieView } from "./movieView";
import { LoginView } from "./loginView";

export const MainView = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) return;
    const getBooks = fetch(
      "https://flicks-api-24f25506e519.herokuapp.com/movies",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const books = data.map(
          ({
            _id,
            Title,
            Description,
            ImagePath,
            Director,
            Actors,
            Genre,
          }) => ({
            id: _id,
            Title,
            Description,
            ImagePath,
            Director,
            Actors,
            Genre,
          })
        );
        console.log(books);
        setMoviesList(books);
      });
  }, [token]);

  const handleBackClick = () => setSelectedMovie(null);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
  };

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} handleBackClick={handleBackClick} />
    );
  }

  if (!moviesList.length) {
    return <h3>No movies found!</h3>;
  }

  return (
    <>
      <button
        onClick={() => {
          setToken(null);
          setUser(null);
        }}
      >
        Logout
      </button>
      <div>
        {moviesList.map((movie) => {
          return (
            <MovieCard
              onMovieClick={handleClick}
              key={movie.id}
              movie={movie}
            />
          );
        })}
      </div>
    </>
  );
};
