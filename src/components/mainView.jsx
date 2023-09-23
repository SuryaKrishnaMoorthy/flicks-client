import { useState, useEffect } from "react";
import { movies } from "../../assets/movies";
import { MovieCard } from "./movieCard";
import { MovieView } from "./movieView";
import { LoginView } from "./loginView";
import { SignUpView } from "./signUpView";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;
    fetch("https://flicks-api-24f25506e519.herokuapp.com/movies", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const movies = data.map(
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
        setMoviesList(movies);
      });
  }, [token]);

  const handleBackClick = () => setSelectedMovie(null);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
  };

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <h3>Or</h3>
        <SignUpView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} handleBackClick={handleBackClick} />
    );
  }

  if (!moviesList.length) {
    return (
      <>
        <button
          onClick={() => {
            setToken(null);
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }}
        >
          Logout
        </button>
        <h3>No movies found!</h3>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
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
