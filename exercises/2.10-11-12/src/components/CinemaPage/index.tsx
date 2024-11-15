import './Cinema.css';
import { MovieProps } from '../../types';
import Movie from '../Movie';

interface CinemaProps {
  name: string;
  movies: MovieProps[];
}

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
	return (
		<div>
			<CinemaSinglePage name="Cinema 1" movies={[
				{
					title: "The Shawshank Redemption",
					director: "Frank Darabont",
					duration: 142,
					description
					: "Two imprisoned",
					budget: 25
				},
				{
					title: "The Godfather",
					director: "Francis Ford Coppola",
					duration: 175,
					description: "An organized crime",
					budget: 6
				},
				{
					title: "The Dark Knight",
					director: "Christopher Nolan",
					duration: 152,
					description: "When the menace",
					budget: 185
				}
			]} />
			<CinemaSinglePage name="Cinema 2" movies={[
				{
					title: "The Shawshank Redemption",
					director: "Frank Darabont",
					duration: 142,
					description: "Two imprisoned",
					budget: 25
				},
				{
					title: "The Godfather",
					director: "Francis Ford Coppola",
					duration: 175,
					description: "An organized crime",
					budget: 6
				},
				{
					title: "The Dark Knight",
					director: "Christopher Nolan",
					duration: 152,
					description: "When the menace",
					budget: 185
				}
			]} />
		</div>
	);
}

export default CinemaPage;