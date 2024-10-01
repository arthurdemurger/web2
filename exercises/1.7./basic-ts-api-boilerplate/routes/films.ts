import { Router } from "express";
import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

const router = Router();

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


router.get("/", (req, res) => {
	const films = parse(jsonDbPath, defaultFilms);
	const {"minimum-duration": minDurationQuery, "title-start": titleStartQuery, "order-by": orderBy, order} = req.query;

	let filteredFilms = films;

	if (minDurationQuery) {
		const minDuration = Number(minDurationQuery);
		filteredFilms = films.filter((film) => {
			return film.duration && film.duration >= minDuration;
		})
	}
	if (titleStartQuery && typeof titleStartQuery === "string") {
		const titleStart = titleStartQuery.toLowerCase().trim();
		filteredFilms = filteredFilms.filter((film) =>
			film.title.toLowerCase().startsWith(titleStart)
		);
	}

	if (orderBy && typeof orderBy === "string") {
		filteredFilms = filteredFilms.sort((a, b) => {
			if (orderBy === "title") {
			return a.title.localeCompare(b.title);
			} else if (orderBy === "duration") {
			return a.duration - b.duration;
			}
			else {
			return 0;
			}
		});

		if (order === "desc") {
			filteredFilms.reverse();
		}
	}

	return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const films = parse(jsonDbPath, defaultFilms);

	const film = films.find((film) => film.id === id);
	if (!film) {
		return res.sendStatus(404);
	}
	return res.json(film);
});


router.post("/", (req, res) => {
	const body: unknown = req.body;

	if ( !body || typeof body !== "object" ||
	!("title" in body) ||	!("director" in body) ||
	!("duration" in body) ||	!("budget" in body) ||
	!("description" in body) ||	!("imageUrl" in body) ||
	typeof body.title !== "string" ||
	typeof body.director !== "string" ||
	typeof body.duration !== "number" ||
	typeof body.budget !== "number" ||
	typeof body.description !== "string" ||
	typeof body.imageUrl !== "string" ||
	!body.title.trim() ||	!body.director.trim() ||
	!body.description.trim() ||	!body.imageUrl.trim() ||
	body.duration <= 0 ||	body.budget <= 0) {
	return res.sendStatus(400);
	}


	const { title, director, duration, budget, description, imageUrl } = body as NewFilm;

	const films = parse(jsonDbPath, defaultFilms);
	const existingFilm = films.find((film) => film.title.toLowerCase() === title.toLowerCase() && film.director.toLowerCase() === director.toLowerCase());

	if (existingFilm) {
		return res.status(409).json({ message: "A film with the same title and director already exists." });
	}

	const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
	const newFilm: Film = {
		id: nextId,
		title,
		director,
		duration,
		budget,
		description,
		imageUrl,
	}

	films.push(newFilm);
	serialize(jsonDbPath, films);
	return res.json(newFilm);
});


router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	const films = parse(jsonDbPath, defaultFilms);

	console.log(id);
	const index = films.findIndex((film) => film.id === id);

	if (index === -1)
		return res.sendStatus(404);

	const deletedElem = films.splice(index, 1);
	serialize(jsonDbPath, films);
	return res.json(deletedElem[0]);
});

router.patch("/:id", (req, res) => {
	const id = Number(req.params.id);
	const films = parse(jsonDbPath, defaultFilms);

	const film = films.find((film) => film.id === id);
	if (!film) {
		return res.sendStatus(404);
	}

	const body: unknown = req.body;

	if (
		!body ||
		typeof body !== "object" ||
		("title" in body &&
			(typeof body.title !== "string" || !body.title.trim())) ||
		("director" in body &&
			(typeof body.director !== "string" || !body.director.trim())) ||
		("duration" in body &&
			(typeof body.duration !== "number" || body.duration <= 0)) ||
		("budget" in body && (typeof body.budget !== "number" || body.budget <= 0)) ||
		("description" in body &&
			(typeof body.description !== "string" || !body.description.trim())) ||
		("imageUrl" in body &&
			(typeof body.imageUrl !== "string" || !body.imageUrl.trim())))
		{
		return res.sendStatus(400);
		}

	const { title, director, duration, budget, description, imageUrl }: Partial<NewFilm> = body;

	if (title) {
		film.title = title;
	}
	if (director) {
		film.director = director;
	}
	if (budget) {
		film.budget = budget;
	}
	if (duration) {
		film.duration = duration;
	}
	if (description) {
		film.description = description;
	}
	if (imageUrl) {
		film.imageUrl = imageUrl;
	}

	serialize(jsonDbPath, films);
	return res.json(film);
});

router.put("/:id", (req, res) => {
	const id = Number(req.params.id);
	const body: unknown = req.body;

	const films = parse(jsonDbPath, defaultFilms);

	// Check if all required fields are present in the request body
	if ( !body || typeof body !== "object" ||
	!("title" in body) || !("director" in body) ||
	!("duration" in body) || !("budget" in body) ||
	!("description" in body) || !("imageUrl" in body) ||
	typeof body.title !== "string" ||
	typeof body.director !== "string" ||
	typeof body.duration !== "number" ||
	typeof body.budget !== "number" ||
	typeof body.description !== "string" ||
	typeof body.imageUrl !== "string" ||
	!body.title.trim() || !body.director.trim() || !body.description.trim() || !body.imageUrl.trim() || body.duration <= 0 || body.budget <= 0 )
	{
		return res.sendStatus(400);
	}

	const { title, director, duration, budget, description, imageUrl } = body as NewFilm;

	const existingFilmIndex = films.findIndex((film) => film.id === id);

	if (existingFilmIndex !== -1) {
		films[existingFilmIndex] = { id, title, director, duration, budget, description, imageUrl };
		return res.json(films[existingFilmIndex]);
	}
	else {
	const idExists = films.some((film) => film.id === id);
	if (idExists) {
		return res.status(409).json({ message: "A film with the provided ID already exists." });
	}

	const newFilm: Film = { id, title, director, duration, budget, description, imageUrl };
	films.push(newFilm);
	serialize(jsonDbPath, films);
	return res.status(201).json(newFilm);
	}
});

export default router;