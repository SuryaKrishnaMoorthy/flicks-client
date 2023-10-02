import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

export const ToastComponent = ({ toastText, movie }) => {
  const [show, setShow] = useState(false);

  const handleAddToFavorites = () => {
    const url = `https://flicks-api-24f25506e519.herokuapp.com/users/${
      JSON.parse(localStorage.getItem("user"))._id
    }/${movie.id}`;
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setShow(true);
        } else {
          setShow(fasle);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setShow(fasle);
      });
  };

  return (
    <Row>
      <Col xs={6}>
        <Button className="text-nowrap" onClick={handleAddToFavorites}>
          {toastText}
        </Button>
      </Col>
      <Col xs={6}>
        <Toast
          position="top-end"
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          className="toast"
        >
          <Toast.Body>{`${movie.Title} has been added to favorites`}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};
