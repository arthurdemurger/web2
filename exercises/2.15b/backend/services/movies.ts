import path from "node:path";

import { Movie, NewMovie } from "../types";

import { serialize, parse } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/movies.json");

const defaultMovies: Movie[] = [
	{
		id: 1,
		title: "Shang-Chi and the Legend of the Ten Rings",
		director: "Destin Daniel Cretton",
		duration: 132,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg",
		description:
			"Shang-Chi, the master of unarmed weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
		budget: 150,
	},
	{
		id: 2,
		title: "The Matrix",
		director: "Lana Wachowski, Lilly Wachowski",
		duration: 136,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
		description:
			"A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
		budget: 63,
	},
	{
		id: 3,
		title: "Summer Wars",
		director: "Mamoru Hosoda",
		duration: 114,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/en/7/7d/Summer_Wars_poster.jpg",
		description:
			"A young math genius solves a complex equation and inadvertently puts a virtual world's artificial intelligence in a position to destroy Earth.",
		budget: 18.7,
	},
	{
		id: 4,
		title: "The Meyerowitz Stories",
		director: "Noah Baumbach",
		duration: 112,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/en/a/af/The_Meyerowitz_Stories.png",
		description:
			"An estranged family gathers together in New York City for an event celebrating the artistic work of their father.",
	},
	{
		id: 5,
		title: "her",
		director: "Spike Jonze",
		duration: 126,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
		description:
			"In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
		budget: 23,
	},
];

const readAll = (minimumDuration: number | undefined = undefined): Movie[] => {
	const movies = parse(jsonDbPath, defaultMovies);
	return minimumDuration
		? movies.filter((movie) => movie.duration >= minimumDuration)
		: movies;
};

const readOne = (id: number): Movie | undefined => {
	const movies = parse(jsonDbPath, defaultMovies);
	return movies.find((movie) => movie.id === id);
};

const createOne = (NewMovie: NewMovie): Movie | undefined => {
	const movies = parse(jsonDbPath, defaultMovies);

	const existingmovie = movies.find(
		(movie) =>
			movie.title.toLowerCase() === NewMovie.title.toLowerCase() &&
			movie.director.toLowerCase() === NewMovie.director.toLowerCase()
	);

	if (existingmovie) {
		return undefined;
	}

	const movie = { id: nextId(), ...NewMovie };

	movies.push(movie);
	serialize(jsonDbPath, movies);

	return movie;
};

const deleteOne = (id: number): Movie | undefined => {
	const movies = parse(jsonDbPath, defaultMovies);

	const index = movies.findIndex((movie) => movie.id === id);

	if (index === -1) {
		return undefined;
	}

	const [movie] = movies.splice(index, 1);
	serialize(jsonDbPath, movies);

	return movie;
};

const updateOne = (
	id: number,
	updatedMovie: Partial<NewMovie>
): Movie | undefined => {
	const movies = parse(jsonDbPath, defaultMovies);

	const index = movies.findIndex((movie) => movie.id === id);

	if (index === -1) {
		return undefined;
	}

	const movie = { ...movies[index], ...updatedMovie };

	movies[index] = movie;
	serialize(jsonDbPath, movies);

	return movie;
};

const updateOrCreateOne = (
	id: number,
	updatedMovie: NewMovie
): Movie | undefined => {
	const movies = parse(jsonDbPath, defaultMovies);

	const index = movies.findIndex((movie) => movie.id === id);

	if (index === -1) {
		return createOne(updatedMovie);
	}

	const movie = { ...movies[index], ...updatedMovie };

	movies[index] = movie;
	serialize(jsonDbPath, movies);

	return movie;
};

const nextId = () =>
	parse(jsonDbPath, defaultMovies).reduce(
		(maxId, movie) => Math.max(maxId, movie.id),
		0
	) + 1;

export { readAll, readOne, createOne, deleteOne, updateOne, updateOrCreateOne };
