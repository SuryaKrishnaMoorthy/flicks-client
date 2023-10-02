import { useState, useEffect } from "react";

import { Card, Container, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "./userInfo";
import { FavoriteMoviesComponent } from "./favoriteMovies";
import { UpdateInfo } from "./updateInfo";
import { DeRegisterModal } from "./deregisterModal";

export const ProfileView = ({ movies, handleLogout }) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const [updatedUser, setUpdatedUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const url = `https://flicks-api-24f25506e519.herokuapp.com/users/${updatedUser._id}`;

    const token = localStorage.getItem("token");

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUpdatedUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      });
  }, []);

  const { Username, Email, Password, Birthday, FavoriteMovies, _id } =
    updatedUser;

  const favoriteMoviesList = [];
  const getFavoriteMovies = () => {
    const favMoviesIds = FavoriteMovies;
    for (let i = 0; i < movies.length; i++) {
      for (let j = 0; j < favMoviesIds?.length; j++) {
        if (movies[i].id === favMoviesIds[j]) {
          favoriteMoviesList.push(movies[i]);
        }
      }
    }
    return favoriteMoviesList;
  };

  const handleUpdate = (user) => {
    setUpdatedUser(user);
  };

  const handleDeregister = () => {
    const url = `https://flicks-api-24f25506e519.herokuapp.com/users/${updatedUser._id}`;

    const token = localStorage.getItem("token");

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          handleLogout();
          setModalShow(false);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <h1 className="textColor">Manage Profile</h1>
      <Container className="textColor">
        <Row>
          <Col xs={12} sm={5}>
            <Card>
              <Card.Body>
                <Card.Title>{"Your Info"}</Card.Title>
                <Card.Text>
                  <UserInfo
                    username={Username}
                    email={Email}
                    birthday={Birthday}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
            <Button
              variant="danger"
              className="mt-5"
              onClick={() => setModalShow(true)}
            >
              Deregister
            </Button>

            <DeRegisterModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              handleDeregister={handleDeregister}
            />
          </Col>
          <Col xs={12} sm={7}>
            <Card>
              <Card.Body>
                <Card.Title>{"Update Information"}</Card.Title>
                <Card.Text>
                  <UpdateInfo
                    user={{
                      Username,
                      Email,
                      Password,
                      Birthday,
                      FavoriteMovies,
                      _id,
                    }}
                    handleUpdate={handleUpdate}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <FavoriteMoviesComponent
          user={{ Username, Email, Password, Birthday, FavoriteMovies, _id }}
          favMovies={getFavoriteMovies()}
          handleUpdate={handleUpdate}
        />
      </Container>
    </>
  );
};
