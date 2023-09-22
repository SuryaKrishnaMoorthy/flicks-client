import { useState } from "react";

/**
 * 
username: 167OLdP5BUfLZGxP
password: K39eKYhPMV9DDWhJ 
 */

export const LoginView = ({ onLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(null);

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
        console.log("Login Response: ", data);
        if (data.user) {
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
    <form
      action=""
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label htmlFor="">
        Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          minLength={3}
        />
      </label>

      <label htmlFor="">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" style={{ width: "40%", marginTop: "2%" }}>
        Login
      </button>
    </form>
  );
};
