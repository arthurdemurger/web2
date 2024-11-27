import './App.css'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Movie, MovieContext, MovieProps } from '../../types';
import { useState } from 'react';

const defaultMovies: Movie[] = [
	{
		id: 1,
		title: "The Shawshank Redemption",
		director: "Frank Darabont",
		duration: 142,
		description: "Two imprisoned",
		budget: 25
	},
	{
		id: 2,
		title: "The Godfather",
		director: "Francis Ford Coppola",
		duration: 175,
		description: "An organized crime",
		budget: 6
	},
	{
		id: 3,
		title: "The Dark Knight",
		director: "Christopher Nolan",
		duration: 152,
		description: "When the menace",
		budget: 185
	}
];

const Header = () => {
	return (
		<header>
			<NavBar />
		</header>
	);
}

const NavBar = () => {
	const navigate = useNavigate();

	return (
		<nav>
			<button className="nav-button" onClick={() => navigate("/")}>Home</button>
			<button className="nav-button" onClick={() => navigate("/cinema")}>Cinema</button>
			<button className="nav-button" onClick={() => navigate("/movies")}>Movies</button>
			<button className="nav-button" onClick={() => navigate("/add_movie")}>Add a movie</button>
		</nav>
	);
};

const Footer = () => (
	<footer>
		<p>Footer</p>
	</footer>
);

const App = () => {
	const [movies, setMovies] = useState(defaultMovies);

	const addMovie = (newMovie: MovieProps) => {
		const movieAdded = { ...newMovie, id: nextMovieId(movies) };
		setMovies([...movies, movieAdded]);
	}

	const movieContext: MovieContext = {
		addMovie,
		setMovies,
		movies
	};

	return (
		<div id="root">
			<Header />
			<main>
				<Outlet context={movieContext} />
			</main>
			<Footer />
		</div>
	)
};

const nextMovieId = (movies: Movie[]) => {
	const ids = movies.map((movie) => movie.id);
	return Math.max(...ids) + 1;
};

export default App;
