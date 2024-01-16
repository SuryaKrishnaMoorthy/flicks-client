import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ToastComponent } from "./toastComponent";

export const MovieView = () => {
  const navigate = useNavigate();
  const { movieName } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const url = `https://flicks-api-24f25506e519.herokuapp.com/movies/${movieName}`;
    const token = localStorage.getItem("token");

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Row className="d-flex mb-4">
        <Col xs={6}>
          {movie && (
            <Image
              rounded
              src={`../${movie?.ImagePath}`}
              alt={movie?.Title}
              style={{ width: "80%" }}
            />
          )}
        </Col>
        <Col xs={6}>
          <div className="mt-3">
            <span>
              <b>Title:</b>
            </span>
            <span>{movie?.Title}</span>
          </div>
          <div>
            <span>
              <b>Director: </b>
            </span>
            <span>{movie?.Director?.Name}</span>
          </div>
          <div>
            <span>
              <b>Genre: </b>
            </span>
            <span>{movie?.Genre?.Name}</span>
          </div>
          <div>
            <span>
              <b>Actors: </b>
            </span>
            {movie?.Actors?.map((actor, i) => (
              <span key={uuidv4()}>
                {actor}
                {i !== movie?.Actors?.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div className="mb-2">
            <span>
              <b>Description: </b>
            </span>
            <span>{movie?.Description}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={2}>
          <Button
            variant="light"
            className="btn me-5"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Col>

        {movie && (
          <ToastComponent toastText="Add to Favorite Movies" movie={movie} />
        )}
      </Row>
    </Container>
  );
};
