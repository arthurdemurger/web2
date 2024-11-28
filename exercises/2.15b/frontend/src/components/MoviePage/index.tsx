import './MoviePage.css'
import { MovieContext } from '../../types';
import { useMatch, useOutletContext } from 'react-router-dom';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const MoviePage = () => {
	const { movies, removeMovie }: MovieContext = useOutletContext();
	const navigate = useNavigate();

	const match = useMatch("/movie_details/:id");
	const id = match?.params.id;

	if (!id)
		return (<p>Movie Not Found</p>);

	const movie = movies.find((movie) => movie.id.toString() === id);

	if (!movie)
		return (<p>Movie Not Found</p>);

	const handleSubmit = (e: SyntheticEvent) => {
			e.preventDefault();
			removeMovie(movie);
			navigate("/movies");
	};

	return (
		<div className="movie-page">
			<h2>{movie.title}</h2>
			<p>Director: {movie.director}</p>
			<p>Duration: {movie.duration} minutes</p>
			{movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} />}
			{movie.description && <p>{movie.description}</p>}
			{movie.budget && <p>Budget: {movie.budget} million(s)</p>}
			<button onClick={handleSubmit}>Remove</button>
		</div>
	);
};

export default MoviePage;