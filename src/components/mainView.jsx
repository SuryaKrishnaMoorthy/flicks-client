import { useState } from "react";
import { movies } from "../../assets/movies";
import { MovieCard } from "./movieCard";
import { MovieView } from "./movieView";


export const MainView = () => {
  const [moviesList, setMoviesList] = useState(movies);
  const [selectedMovie, setSelectedMovie] = useState(null)

  const handleBackClick = () => setSelectedMovie(null);
  
  const handleClick = (movie) => {
    setSelectedMovie(movie)
  };

  if(selectedMovie)  {
    return <MovieView movie={selectedMovie} handleBackClick={handleBackClick} />
  }

  if(!moviesList.length) {
    return <h6>No movies found!</h6>
  }
  
  return (
    <div>
      {moviesList.map((movie) => (<MovieCard onMovieClick={handleClick} key={movie._id} movie={...movie} />))}
    </div>
  );
};




