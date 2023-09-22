import { useState } from "react";

export const SignUpView = ({ onLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Username: userName,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://flicks-api-24f25506e519.herokuapp.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        onLoggedIn(userName);
      } else {
        alert("Signup Failed!");
      }
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
      <label htmlFor="">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="">
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit" style={{ width: "40%", marginTop: "2%" }}>
        Sign Up
      </button>
    </form>
  );
};
