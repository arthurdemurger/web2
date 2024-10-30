import './Cinema.css';

interface Movie {
  title: string;
  director: string;
}

interface CinemaProps {
  name: string;
  movies: Movie[];
}

const Cinema = (props: CinemaProps) => {
	return (
		<div className="cinema">
			<h2>{props.name}</h2>
			<ul>
				{props.movies.map((movie, index) => (
					<li key={index}>
						<strong>{movie.title}</strong> - Director: {movie.director}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Cinema;