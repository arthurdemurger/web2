import { MovieContext, Movie } from "../../types";
import { Link, useOutletContext } from "react-router-dom";
import "./HomePage.css";
import { SyntheticEvent } from "react";

const HomePage = () => {
	const { movies, removeMovie }: MovieContext = useOutletContext();

	const favoriteMovies = movies.filter(movie => !(movie.id % 2 === 0));

	const handleSubmit = (movie: Movie) => (e: SyntheticEvent) => {
		e.preventDefault();
		removeMovie(movie);
	};

	return (
		<div>
			<h1>Home Page</h1>
			<p>Welcome to the home page!</p>
			<h2>Favorite Movies</h2>
			<ul>
				{favoriteMovies.map(movie => (
					<li key={movie.id}>
						<Link className="link" to={`/movie_details/${movie.id}`} >
							{movie.title}
						</Link>
						<button onClick={handleSubmit(movie)}>Remove</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default HomePage;