import { SyntheticEvent } from 'react';
import { useState } from 'react';
import './AddMoviePage.css';
import { useNavigate, useOutletContext } from "react-router-dom";
import { MovieContext } from '../../types';

const AddMoviePage = () => {
	const { addMovie }: MovieContext = useOutletContext();

	const [movieTitle, setMovieTitle] = useState("");
	const [director, setDirector] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [duration, setDuration] = useState(0);
	const [description, setDescription] = useState("");
	const [budget, setBudget] = useState(0);
	const navigate = useNavigate();

	const handleMovieTitleChange = (e: SyntheticEvent) => {
		const input = e.target as HTMLInputElement;
		setMovieTitle(input.value);
	};

	const handleDirectorChange = (e: SyntheticEvent) => {
		const input = e.target as HTMLInputElement;
		setDirector(input.value);
	};

	const handleImageUrlChange = (e: SyntheticEvent) => {
		const input = e.target as HTMLInputElement;
		setImageUrl(input.value);
	};

	const handleDurationChange = (e: SyntheticEvent) => {
		const input = e.target as HTMLInputElement;
		setDuration(Number(input.value));
	};

	const handleDescriptionChange = (e: SyntheticEvent) => {
		const input = e.target as HTMLInputElement;
		setDescription(input.value);
	};

	const handleBudgetChange = (e: SyntheticEvent) => {
		const input = e.target as HTMLInputElement;
		setBudget(Number(input.value));
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		addMovie({ title: movieTitle, duration: duration, director: director, imageUrl: imageUrl, description: description, budget: budget});
		navigate("/movies")
	}

	return (
		<div className="add-movie-page">
			<h1>Add a new movie</h1>
			<form onSubmit={handleSubmit} className="add-movie-form">
				<label htmlFor="movieTitle">Title : </label>
					<input
						value={movieTitle}
						type="text"
						id="movieTitle"
						name="movieTitle"
						onChange={handleMovieTitleChange}
						className='input-field'
						required
					/>
				<label htmlFor="director">Director : </label>
					<input
						value={director}
						type="text"
						id="director"
						name="director"
						onChange={handleDirectorChange}
						className='input-field'
						required
					/>
				<label htmlFor="duration">Duration in minutes : </label>
					<input
						value={duration}
						type="number"
						id="duration"
						name="duration"
						onChange={handleDurationChange}
						className='input-field'
						required
					/>
				<label htmlFor="imageUrl">Image URL : </label>
					<input
						value={imageUrl}
						type="text"
						id="imageUrl"
						name="imageUrl"
						onChange={handleImageUrlChange}
						className='input-field'
					/>
				<label htmlFor="description">Description : </label>
					<input
						value={description}
						type="text"
						id="description"
						name="description"
						onChange={handleDescriptionChange}
						className='input-field'
					/>
				<label htmlFor="budget">Budget in millions : </label>
					<input
						value={budget}
						type="number"
						id="budget"
						name="budget"
						onChange={handleBudgetChange}
						className='input-field'
					/>
				<button type="submit" className="submit-button">Add Movie</button>
			</form>
		</div>
	);
};

export default AddMoviePage;
