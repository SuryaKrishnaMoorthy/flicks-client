import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useParams, Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieName } = useParams();
  const movie = movies.find((movie) => movie.Title === movieName);

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
      <Link to="/">
        <Button type="button">Back</Button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string,
      ImagePath: PropTypes.string,
      Director: PropTypes.shape({
        Name: PropTypes.string,
      }),
      Actors: PropTypes.array,
      Genre: PropTypes.shape({ Name: PropTypes.string }),
    })
  ).isRequired,
};
