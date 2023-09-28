import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Flicks
        </Navbar.Brand>
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
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
