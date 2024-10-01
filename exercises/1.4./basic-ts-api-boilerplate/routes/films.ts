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
export default router;