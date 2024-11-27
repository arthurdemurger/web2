import './Cinema.css';
import Movie from '../Movie';
import { MovieContext } from '../../types';
import { CinemaProps } from '../../types';
import { useOutletContext } from 'react-router-dom';

const CinemaSinglePage = ({name, movies}: CinemaProps) => {
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

const CinemaPage = () => {
	const { movies }: MovieContext = useOutletContext();

	return (
		<div>
			<CinemaSinglePage name="Cinema 1" movies={movies} />
			<CinemaSinglePage name="Cinema 2" movies={movies} />
		</div>
	);
}

export default CinemaPage;