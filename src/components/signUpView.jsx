import { useState } from "react";

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
            minLength={8}
            maxLength={20}
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

      {signupSuccess && (
        <h4 style={{ color: "green" }}>
          "Successfully registered. Please login to see movies!"
        </h4>
      )}
    </>
  );
};
