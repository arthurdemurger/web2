import './MoviePage.css'
import { MovieContext } from '../../types';
import { useMatch, useOutletContext } from 'react-router-dom';

const MoviePage = () => {
	const { movies }: MovieContext = useOutletContext();

	const match = useMatch("/movie_details/:id");
	const id = match?.params.id;

	if (!id)
		return (<p>Movie Not Found</p>);

	const movie = movies.find((movie) => movie.id.toString() === id);

	if (!movie)
		return (<p>Movie Not Found</p>);

	return (
		<div className="movie-page">
			<h2>{movie.title}</h2>
			<p>Director: {movie.director}</p>
			<p>Duration: {movie.duration} minutes</p>
			{movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} />}
			{movie.description && <p>{movie.description}</p>}
			{movie.budget && <p>Budget: {movie.budget} million(s)</p>}
		</div>
	);
};

export default MoviePage;