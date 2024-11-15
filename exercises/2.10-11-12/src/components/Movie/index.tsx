import { useState } from 'react';
import './Movie.css';
import { MovieProps } from '../../types';

const Movie = ({ title, director, description }: MovieProps) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleDescription = () => {
		setIsClicked(!isClicked);
	};

	return (
		<div className="movie">
			<div className="movie-header" onClick={handleDescription}>
				<strong className="movie-title">{title}</strong> - <span className="movie-director">Director: {director}</span>
			</div>
			{isClicked && <p className="movie-description">{description}</p>}
		</div>
	);
};

export default Movie;
export type { MovieProps };