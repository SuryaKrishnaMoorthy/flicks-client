import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <button
      style={{ width: "70%", border: "none", borderBottom: "1px solid grey" }}
      onClick={() => onMovieClick(movie)}
    >
      <div>
        <h3>{movie.Title}</h3>
      </div>
    </button>
  );
};

MovieCard.propTypes = {
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
  onMovieClick: PropTypes.func.isRequired,
};
