import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms : Film[] = [

	{
		id: 1,
		title: "The Shawshank Redemption",
		director: "Frank Darabont",
		duration: 142,
		budget: 25000000,
		description: "Two imprisoned",
		imageUrl: "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"
	},
	{
		id: 2,
		title: "The Godfather",
		director: "Francis Ford Coppola",
		duration: 175,
		budget: 6000000,
		description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
		imageUrl: "https://www.imdb.com/title/tt0068646/mediaviewer/rm10105600/?ref_=tt_ov_i"
	},
	{
		id: 3,
		title: "The Dark Knight",
		director: "Christopher Nolan",
		duration: 152,
		budget: 185000000,
		description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
		imageUrl: "https://www.imdb.com/title/tt0468569/mediaviewer/rm10105600/?ref_=tt_ov_i"
	},
];


function readAllFilms(): Film[] {
	const films = parse(jsonDbPath, defaultFilms);
	return films;
}

function findById(id: number): Film | undefined {
	const films = parse(jsonDbPath, defaultFilms);
	return films.find((film) => film.id === id);
}

function createFilm(newFilm: NewFilm): Film {
	const films = parse(jsonDbPath, defaultFilms);

	const lastId = films.length > 0 ? films[films.length - 1].id : 0;

	const film: Film = { id: lastId + 1, ...newFilm };

	const updatedFilms = [...films, film];

	serialize(jsonDbPath, updatedFilms);
	return film;
}

function deleteFilm(id: number): Film | undefined{
	const films = parse(jsonDbPath, defaultFilms);

	const index = films.findIndex((film) => film.id === id);
	if (index === -1)
		return undefined;

	const deletedElements = films.splice(index, 1);
	serialize(jsonDbPath, films);
	return deletedElements[0];
}

function findByTitleDirector(title: string, director: string): Film | undefined {
	const films = parse(jsonDbPath, defaultFilms);
	return films.find((film) => film.title === title && film.director === director);
}

function filterByDuration(duration: number): Film[] {
	const films = parse(jsonDbPath, defaultFilms);
	return films.filter((film) => {
		return film.duration && film.duration >= duration;
	});
}

function searchByTitle(title: string): Film[] {
	const films = parse(jsonDbPath, defaultFilms);
	return films.filter((film) => {
		return film.title.toLowerCase().startsWith(title.toLowerCase());
	});
}

function patchFilm(film: Film, patch: NewFilm): Film {
	const films = parse(jsonDbPath, defaultFilms);

	if (patch.title) {
		film.title = patch.title;
	}
	if (patch.director) {
		film.director = patch.director;
	}
	if (patch.budget) {
		film.budget = patch.budget;
	}
	if (patch.duration) {
		film.duration = patch.duration;
	}
	if (patch.description) {
		film.description = patch.description;
	}
	if (patch.imageUrl) {
		film.imageUrl = patch.imageUrl;
	}

	serialize(jsonDbPath, films);
	return (film);
}


function orderBy(type: string, order: string): Film[] {
	const films = parse(jsonDbPath, defaultFilms);

	films.sort((a, b) => {
		if (type === "title")
			return a.title.localeCompare(b.title);
		else if (type === "duration")
			return a.duration - b.duration;
		else
			return 0;
	});

	if (order === "desc") {
		films.reverse();
	}
	return films;
}

export {
	readAllFilms,
	findById,
	createFilm,
	deleteFilm,
	findByTitleDirector,
	filterByDuration,
	searchByTitle,
	orderBy,
	patchFilm
}