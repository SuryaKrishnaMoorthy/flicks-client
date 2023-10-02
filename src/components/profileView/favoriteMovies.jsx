import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";

import { Link } from "react-router-dom";

export const FavoriteMoviesComponent = ({ user, favMovies, handleUpdate }) => {
  const handleDelete = (movieId) => {
    const url = `https://flicks-api-24f25506e519.herokuapp.com/users/${user._id}/${movieId}`;
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //Get the updated user after deletion of movie
        if (res.ok) {
          fetch(
            `https://flicks-api-24f25506e519.herokuapp.com/users/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              handleUpdate(data);
              localStorage.setItem("user", JSON.stringify(data));
            })
            .catch((err) => console.log(err.message));
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Row>
        <Col sm={12}>
          <h3>Favorite Movies</h3>
        </Col>
        {!user ? (
          <Navigate to="/login" />
        ) : favMovies.length === 0 ? (
          <Col md={8}>
            <p className="mt-5">No Favorite movies yet!</p>
          </Col>
        ) : (
          favMovies.map(({ id, Title, Genre, ImagePath }) => {
            return (
              <Col md={3} xs={6} sm={4} className="mb-4" key={id}>
                <Card
                  as={Link}
                  to={`/movies/${encodeURIComponent(Title)}`}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Card.Img
                    variant="top"
                    className="h-100"
                    src={`./${ImagePath}`}
                  />
                  <Card.Body>
                    <Card.Title>{Title}</Card.Title>
                    <Card.Text>Genre: {Genre.Name}</Card.Text>
                    <Card.Link
                      as={Link}
                      to={`/movies/${encodeURIComponent(Title)}`}
                    >
                      Details
                    </Card.Link>
                    <Card.Link as={Link} to={`/profile`} className="floatRight">
                      <CloseButton onClick={() => handleDelete(id)} />
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};
