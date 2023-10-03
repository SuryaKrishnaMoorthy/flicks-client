import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { v4 as uuidv4 } from "uuid";
import { Card } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";

import { Link, useNavigate } from "react-router-dom";

export const FavoriteMoviesComponent = ({ user, favMovies, handleUpdate }) => {
  const navigate = useNavigate();
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
        navigate("/profile", { replace: true });
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
          favMovies.map(({ _id, Title, Genre, ImagePath }) => {
            return (
              <Col md={4} xs={6} sm={4} className="mb-4" key={uuidv4()}>
                <Card
                  // as={Link}
                  // to={`/movies/${encodeURIComponent(Title)}`}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Card.Img
                    variant="top"
                    className="h-100"
                    src={`./${ImagePath}`}
                    onClick={() =>
                      navigate(`/movies/${encodeURIComponent(Title)}`, {
                        replace: true,
                      })
                    }
                  />
                  <Card.Body
                    onClick={() =>
                      navigate(`/movies/${encodeURIComponent(Title)}`, {
                        replace: true,
                      })
                    }
                  >
                    <Card.Title>{Title}</Card.Title>
                    <Card.Text>Genre: {Genre.Name}</Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Card.Link
                      as={Link}
                      to={`/movies/${encodeURIComponent(Title)}`}
                    >
                      Details
                    </Card.Link>
                    <CloseButton
                      onClick={() => handleDelete(_id)}
                      className="floatRight"
                    />
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
