import { Film } from "../../types";
import './FilmMenu.css';


interface FilmMenuProps {
	films: Film[];
}

const FilmMenu = ({films}: FilmMenuProps) => {
	return (
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
			{films.map((film) => (
				<tr>
					<td>{film.title}</td>
					<td>{film.director}</td>
					<td>{film.duration}</td>
					<td>{film.imageUrl && <img src={film.imageUrl} alt="film_image"></img>}</td>
					<td>{film.description}</td>
					<td>{film.budget}</td>
				</tr>
			)
			)}
			</tbody>

		</table>
	);
};

export default FilmMenu;