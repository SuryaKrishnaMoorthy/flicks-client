import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card onClick={() => onMovieClick(movie)}>
      <Card.Img
        variant="top"
        className="h-100"
        fluid
        src="https://miro.medium.com/v2/resize:fit:1033/1*Vv_Fa7_RyvNa9heDTqUc1g.png"
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Actors: PropTypes.array.isRequired,
    Genre: PropTypes.shape({ Name: PropTypes.string }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
