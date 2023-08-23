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
