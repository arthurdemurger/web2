import { Movie } from "../../types";
import './MovieListPage.css';
import { useState, SyntheticEvent } from 'react';

const MovieListPage = () => {

const movie_1 = {
	id: 1,
	title:"The Shawshank Redemption",
	director:"Frank Darabont",
	duration:142,
	imageUrl:"src/assets/img/zushi.jpg",
	description: "Two imprisoned",
	budget:25
};

const movie_2 = {
		id: 2,
		title:"The Godfather",
		director:"Francis Ford Coppola",
		duration:175,
		imageUrl:"src/assets/img/zushi.jpg",
		description: "An organized crime",
		budget:6
	};

const movie_3 = {
		id: 3,
		title:"The Dark Knight",
		director:"Christopher Nolan",
		duration:152,
		imageUrl:"src/assets/img/zushi.jpg",
		description: "When the menace",
		budget:185
	};

const defaultMovies: Movie[] = [movie_1, movie_2, movie_3];

const [title, setTitle] = useState("");
const [director, setDirector] = useState("");
const [duration, setDuration] = useState(0);
const [imageUrl, setImageUrl] = useState("");
const [description, setDescription] = useState("");
const [budget, setBudget] = useState(0);

const [moviesList, setMoviesList] = useState(defaultMovies);

const handleSubmit = (e: SyntheticEvent) => {
	e.preventDefault();
	console.log("submit :", title, director, duration, imageUrl, description, budget);
	const newMovie = {
		id: nextFilmId(moviesList),
		title: title,
		director: director,
		duration: duration,
		imageUrl: imageUrl,
		description: description,
		budget: budget
	};
	setMoviesList([...moviesList, newMovie]);
};

const handleTitleChange = (e: SyntheticEvent) => {
	const titleInput = e.target as HTMLInputElement;
	console.log("change in title input : ", titleInput.value);
	setTitle(titleInput.value);
}

const handleDirectorChange = (e: SyntheticEvent) => {
	const directorInput = e.target as HTMLInputElement;
	console.log("change in director input : ", directorInput.value);
	setDirector(directorInput.value);
}

const handleDurationChange = (e: SyntheticEvent) => {
	const durationInput = e.target as HTMLInputElement;
	console.log("change in duration input : ", durationInput.value);
	setDuration(parseInt(durationInput.value));
}

const handleImageUrlChange = (e: SyntheticEvent) => {
	const imageUrlInput = e.target as HTMLInputElement;
	console.log("change in imageUrl input : ", imageUrlInput.value);
	setImageUrl(imageUrlInput.value);
}

const handleDescriptionChange = (e: SyntheticEvent) => {
	const descriptionInput = e.target as HTMLInputElement;
	console.log("change in description input : ", descriptionInput.value);
	setDescription(descriptionInput.value);
}

const handleBudgetChange = (e: SyntheticEvent) => {
	const budgetInput = e.target as HTMLInputElement;
	console.log("change in budget input : ", budgetInput.value);
	setBudget(parseInt(budgetInput.value));
}

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
				{moviesList.map((movie) => (
					<tr>
						<td>{movie.title}</td>
						<td>{movie.director}</td>
						<td>{movie.duration}</td>
						<td>{movie.imageUrl && <img src={movie.imageUrl} alt="movie_image"></img>}</td>
						<td>{movie.description}</td>
						<td>{movie.budget}</td>
					</tr>
				)
				)}
				</tbody>

			</table>
			<div>
				<br/>
				<form onSubmit={handleSubmit}>
					<label htmlFor="title">Title</label>
					<input value={title}
					type="text"
					id="title"
					name="title"
					onChange={handleTitleChange}
					required
					/>
					<label htmlFor="director">Director</label>
					<input value={director}
					type="text"
					id="director"
					name="director"
					onChange={handleDirectorChange}
					required
					/>
					<label htmlFor="duration">Duration</label>
					<input value={duration}
					type="number"
					id="duration"
					name="duration"
					onChange={handleDurationChange}
					required
					/>
					<label htmlFor="imageUrl">Image URL</label>
					<input value={imageUrl}
					type="text"
					id="imageUrl"
					name="imageUrl"
					onChange={handleImageUrlChange}
					required
					/>
					<label htmlFor="description">Description</label>
					<input value={description}
					type="text"
					id="description"
					name="description"
					onChange={handleDescriptionChange}
					required
					/>
					<label htmlFor="budget">Budget</label>
					<input value={budget}
					type="number"
					id="budget"
					name="budget"
					onChange={handleBudgetChange}
					required
					/>
					<button type="submit">Add film</button>
				</form>
			</div>
		</main>
	);
};


const nextFilmId = (movies: Movie[]) => {
	return movies.reduce((maxId, movie) => Math.max(maxId, movie.id), 0) + 1;
};

export default MovieListPage;