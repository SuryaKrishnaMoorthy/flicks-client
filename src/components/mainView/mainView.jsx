import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../loginView/loginView";
import { SignUpView } from "../signUpView/signUpView";
import { NavigationBar } from "../navigationBar/navigationBar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [moviesList, setMoviesList] = useState([]);
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

  const handleClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignUpView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieName"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col md={8}>
                    <MovieView movies={moviesList} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : moviesList.length === 0 ? (
                  <Col md={8}>
                    <h3>No movies found!</h3>
                  </Col>
                ) : (
                  <>
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
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
