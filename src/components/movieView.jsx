import { v4 as uuidv4 } from "uuid";

export const MovieView = ({ movie, handleBackClick }) => {
  return (
    <div>
      <div>
        <img
          style={{ width: "100px" }}
          src={movie.ImagePath}
          alt={movie.Title}
        />
      </div>
      <div>
        <span>Title:</span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Actors: </span>
        {movie.Actors.map((actor, i) => (
          <span key={uuidv4()}>
            {actor}
            {i !== movie.Actors.length - 1 && ", "}
          </span>
        ))}
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};
