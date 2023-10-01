import React from "react";

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
    <div className="mt-5">
      <p>Name: {username}</p>
      <p>Email: {email}</p>
      <p>Birthday: {`${birthMonth}/${birthDate}/${birthYear}`}</p>
    </div>
  );
};
