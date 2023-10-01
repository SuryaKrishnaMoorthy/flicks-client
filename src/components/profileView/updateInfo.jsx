import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const UpdateInfo = ({ user, handleUpdate }) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user?.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email);
  const [birthday, setBirthday] = useState("");
  const [editSuccess, setEditSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Username: userName,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    const token = localStorage.getItem("token");
    const url = `https://flicks-api-24f25506e519.herokuapp.com/users/${user._id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        setEditSuccess(true);
        fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            handleUpdate(data);
            localStorage.setItem("user", JSON.stringify(data));
          })
          .catch((err) => console.log(err.message));
      } else {
        alert("Updation Failed!");
        setEditSuccess(false);
      }
    });
    setUserName("");
    setPassword("");
    setEmail("");
    setBirthday("");
  };

  return (
    <div>
      <Form action="" onSubmit={handleSubmit}>
        <Form.Group controlId="updationFormUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            minLength={3}
          />
        </Form.Group>

        <Form.Group controlId="updationFormPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password should have minimum length of 8"
            value={password}
            minLength={8}
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="updationFormEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="updationFormBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Update
        </Button>
      </Form>
      {editSuccess && (
        <>
          <p variant="primary">Successfully updated</p>
        </>
      )}
    </div>
  );
};
