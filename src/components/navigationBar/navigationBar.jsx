import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const NavigationBar = ({
  user,
  onLoggedOut,
  filterMovies,
  handleLoadAllMovies,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    filterMovies(searchText);
    setSearchText("");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-5" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleLoadAllMovies}>
          Flicks
        </Navbar.Brand>
        {user && (
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="search"
              placeholder="Search movie"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" variant="outline-dark">
              Search
            </Button>
          </Form>
        )}
        <Nav>
          {!user ? (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                SignUp
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/" onClick={handleLoadAllMovies}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
