import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
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
        console.log(movies, "64acb018477cd1343bf31702");
        setMoviesList(movies);
      });
  }, [token]);

  const handleBackClick = () => setSelectedMovie(null);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
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
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView movie={selectedMovie} handleBackClick={handleBackClick} />
        </Col>
      ) : !moviesList.length ? (
        <Col md={8}>
          <Button
            onClick={() => {
              setToken(null);
              setUser(null);
              localStorage.removeItem("user");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Button>
          <h3>No movies found!</h3>
        </Col>
      ) : (
        <>
          <Button
            type="button"
            className="mb-5 mt-5"
            onClick={() => {
              setToken(null);
              setUser(null);
              localStorage.removeItem("user");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Button>
          {moviesList.map((movie) => {
            return (
              <Col md={3} xs={6} sm={4} className="mb-4">
                <MovieCard
                  onMovieClick={handleClick}
                  key={movie.id}
                  movie={movie}
                />
              </Col>
            );
          })}
        </>
      )}
    </Row>
  );
};
