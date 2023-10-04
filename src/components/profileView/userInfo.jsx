import React from "react";
import { Card } from "react-bootstrap";

export const UserInfo = ({ username, email, birthday }) => {
  const birthMonth =
    parseInt(new Date(birthday).getMonth()) + 1 < 10
      ? `0${parseInt(new Date(birthday).getMonth()) + 1}`
      : `${parseInt(new Date(birthday).getMonth()) + 1}`;

  const birthDate =
    parseInt(new Date(birthday).getDate()) + 1 < 10
      ? `0${new Date(birthday).getDate() + 1}`
      : `${new Date(birthday).getDate() + 1}`;

  const birthYear = new Date(birthday).getFullYear();

  return (
    // <>
    <Card>
      <Card.Body>
        <Card.Title>{"Your Info"}</Card.Title>
        <Card.Text>
          <span>Name: {username}</span>
          <br />
          <span>Email: {email}</span>
          <br />
          <span>Birthday: {`${birthMonth}/${birthDate}/${birthYear}`}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
