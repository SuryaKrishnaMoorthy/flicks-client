import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../loginView/loginView";
import { SignUpView } from "../signUpView/signUpView";
import { NavigationBar } from "../navigationBar/navigationBar";
import { ProfileView } from "../profileView/profileView";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [moviesList, setMoviesList] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [filteredMovies, setFilteredMovies] = useState([]);

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
        setMoviesList(data);
      })
      .catch((error) => console.log(error.message));
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const filterMovies = (text) => {
    const filtered = moviesList?.filter((movie) =>
      movie.Title.toLowerCase().includes(text)
    );
    setFilteredMovies(filtered);
  };

  const handleLoadAllMovies = () => {
    setFilteredMovies([]);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={handleLogout}
        filterMovies={filterMovies}
        handleLoadAllMovies={handleLoadAllMovies}
      />
      <Container>
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
                      <MovieView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" />
                  ) : (
                    <Col md={8}>
                      <ProfileView
                        user={user}
                        movies={moviesList}
                        handleLogout={handleLogout}
                      />
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
                  ) : filteredMovies.length ? (
                    filteredMovies.map((movie) => {
                      return (
                        <Col
                          key={movie._id}
                          md={3}
                          xs={6}
                          sm={4}
                          className="mb-4"
                        >
                          <MovieCard movie={movie} />
                        </Col>
                      );
                    })
                  ) : (
                    moviesList.map((movie) => {
                      return (
                        <Col
                          key={movie._id}
                          md={3}
                          xs={6}
                          sm={4}
                          className="mb-4"
                        >
                          <MovieCard movie={movie} />
                        </Col>
                      );
                    })
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
