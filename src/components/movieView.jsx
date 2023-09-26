import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export const MovieView = ({ movie, handleBackClick }) => {
  return (
    <div>
      <div>
        <Image
          src="https://miro.medium.com/v2/resize:fit:1033/1*Vv_Fa7_RyvNa9heDTqUc1g.png"
          alt={movie.Title}
          fluid
          className="mt-5"
        />
      </div>
      <div className="mt-5">
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
      <div className="mb-5">
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <Button onClick={handleBackClick}>Back</Button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Actors: PropTypes.array,
    Genre: PropTypes.shape({ Name: PropTypes.string }),
  }).isRequired,
  handleBackClick: PropTypes.func.isRequired,
};
