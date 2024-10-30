import './Cinema.css';
import { MovieProps } from '../Movie';
import Movie from '../Movie';

interface CinemaProps {
  name: string;
  movies: MovieProps[];
}

const Cinema = ({name, movies}: CinemaProps) => {
	return (
		<div className="cinema">
			<h2>{name}</h2>
			<ul>
				{movies.map((movie, title) => (
					<li key={title}>
						<Movie {...movie} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default Cinema;