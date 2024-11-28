import { MovieContext } from "../../types";
import { Link, useOutletContext } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
	const { movies }: MovieContext = useOutletContext();

	const favoriteMovies = movies.filter(movie => !(movie.id % 2 === 0));

	return (
		<div>
			<h1>Home Page</h1>
			<p>Welcome to the home page!</p>
			<h2>Favorite Movies</h2>
			<ul>
				{favoriteMovies.map(movie => (
					<Link className="link" key={movie.id} to={`/movie_details/${movie.id}`} >
						{movie.title}
				  	</Link>
				))}
			</ul>
		</div>
	);
};

export default HomePage;