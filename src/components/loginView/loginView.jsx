import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
/**
 * 
username: 167OLdP5BUfLZGxP
password: K39eKYhPMV9DDWhJ 
 */

export const LoginView = ({ onLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Username: userName,
      Password: password,
    };

    fetch("https://flicks-api-24f25506e519.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such User!");
        }
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  };

  return (
    <Form
      action=""
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-4">
        Login
      </Button>
    </Form>
  );
};
