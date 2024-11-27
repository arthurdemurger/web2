import './MovieListPage.css';
import { useOutletContext } from "react-router-dom";
import { MovieContext } from "../../types";

const MovieListPage = () => {
	const { movies }: MovieContext = useOutletContext();


	return (
		<main>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Director</th>
						<th>Duration</th>
						<th>Image</th>
						<th>Description</th>
						<th>Budget in millions</th>
					</tr>
				</thead>

				<tbody>
				{movies.map((movie) => (
					<tr>
						<td>{movie.title}</td>
						<td>{movie.director}</td>
						<td>{movie.duration}</td>
						<td><img src="/src/assets/img/zushi.jpg" alt="movie_image"></img></td>
						<td>{movie.description}</td>
						<td>{movie.budget}</td>
					</tr>
				)
				)}
				</tbody>
			</table>
		</main>
	);
};

export default MovieListPage;