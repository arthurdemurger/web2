import './App.css'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Movie, MovieContext, MovieProps } from '../../types';
import { useEffect, useState } from 'react';

// const defaultMovies: Movie[] = [
// 	{
// 		id: 1,
// 		title: "The Shawshank Redemption",
// 		director: "Frank Darabont",
// 		duration: 142,
// 		imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
// 		description: "Two imprisoned",
// 		budget: 25
// 	},
// 	{
// 		id: 2,
// 		title: "The Godfather",
// 		director: "Francis Ford Coppola",
// 		duration: 175,
// 		imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
// 		description: "An organized crime",
// 		budget: 6
// 	},
// 	{
// 		id: 3,
// 		title: "The Dark Knight",
// 		director: "Christopher Nolan",
// 		duration: 152,
// 		imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
// 		description: "When the menace",
// 		budget: 185
// 	},
// ];

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
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		fetchMovies();
	}, []);

	const fetchMovies = async () => {
		try {
			const movies = await getAllMovies();
			setMovies(movies);
		} catch (err) {
			console.error("HomePage::error: ", err);
		}
	};

	async function getAllMovies() {
		try {
			const response = await fetch("/api/movies");

			if (!response.ok)
				throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

			const movies = await response.json();

			return movies;
		} catch (err) {
			console.error("getAllMovies::error: ", err);
			return [];
		}
	}


	const addMovie = async (newMovie: MovieProps) => {
		try {
			const movieToAdd = {...newMovie, id: nextMovieId(movies)};

			const options = {
				method: "POST",
				body: JSON.stringify(movieToAdd),
				headers: {
					"Content-Type": "application/json",
				},
			};

			const response = await fetch("/api/movies", options);

			if (!response.ok)
				throw new Error (`fetch error : ${response.status} : ${response.statusText}`);

			const createdMovie = await response.json();

			setMovies([...movies, createdMovie]);
		} catch (err) {
			console.error("AddMoviePage::error: ", err);
		}
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
