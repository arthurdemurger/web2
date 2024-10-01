import { Router } from "express";
import { Film, NewFilm } from "../types";

const router = Router();

const defaultFilm : Film[] = [

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
	const {"minimum-duration": minDurationQuery, "title-start": titleStartQuery, "order-by": orderBy, order} = req.query;

	let filteredFilms = defaultFilm;

	if (minDurationQuery) {
		const minDuration = Number(minDurationQuery);
		filteredFilms = defaultFilm.filter((film) => {
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

	const film = defaultFilm.find((film) => film.id === id);
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

	const existingFilm = defaultFilm.find((film) => film.title.toLowerCase() === title.toLowerCase() && film.director.toLowerCase() === director.toLowerCase());

	if (existingFilm) {
		return res.status(409).json({ message: "A film with the same title and director already exists." });
	}

	const nextId = defaultFilm.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

	const newFilm: Film = {
		id: nextId,
		title,
		director,
		duration,
		budget,
		description,
		imageUrl,
	}

	defaultFilm.push(newFilm);

	return res.json(newFilm);
});


router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);

	console.log(id);
	const index = defaultFilm.findIndex((film) => film.id === id);

	if (index === -1)
		return res.sendStatus(404);

	const deletedElem = defaultFilm.splice(index, 1);
	return res.json(deletedElem[0]);
});

router.patch("/:id", (req, res) => {
	const id = Number(req.params.id);
	const film = defaultFilm.find((film) => film.id === id);
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

	return res.json(film);
});

router.put("/:id", (req, res) => {
	const id = Number(req.params.id);
	const body: unknown = req.body;

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

	const existingFilmIndex = defaultFilm.findIndex((film) => film.id === id);

	if (existingFilmIndex !== -1) {
		defaultFilm[existingFilmIndex] = { id, title, director, duration, budget, description, imageUrl };
		return res.json(defaultFilm[existingFilmIndex]);
	}
	else {
	const idExists = defaultFilm.some((film) => film.id === id);
	if (idExists) {
		return res.status(409).json({ message: "A film with the provided ID already exists." });
	}

	const newFilm: Film = { id, title, director, duration, budget, description, imageUrl };
	defaultFilm.push(newFilm);
	return res.status(201).json(newFilm); // Created
	}
});

export default router;