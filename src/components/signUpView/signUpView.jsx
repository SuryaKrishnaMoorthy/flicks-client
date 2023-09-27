import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SignUpView = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Username: userName,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://flicks-api-24f25506e519.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        setSignupSuccess(true);
      } else {
        alert("Signup Failed!");
        setSignupSuccess(false);
      }
    });
    setUserName("");
    setPassword("");
    setEmail("");
    setBirthday("");
  };

  return (
    <>
      <Form action="" onSubmit={handleSubmit}>
        <Form.Group controlId="signUpFormUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            minLength={3}
          />
        </Form.Group>

        <Form.Group controlId="signUpFormPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            minLength={8}
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="signUpFormEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="signUpFormBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Sign Up
        </Button>
      </Form>

      {signupSuccess && (
        <h4 style={{ color: "green" }}>
          "Successfully registered. Please login to see movies!"
        </h4>
      )}
    </>
  );
};
