import { Router } from "express";
import { Film, NewFilm } from "../types";

import {	readAllFilms,
			filterByDuration,
			searchByTitle,
			orderBy,
			findById,
			findByTitleDirector,
			createFilm,
			deleteFilm,
			patchFilm
		} from "../services/films";


const router = Router();

router.get("/", (req, res) => {
	const films = readAllFilms();

	const {"minimum-duration": minDurationQuery, "title-start": titleStartQuery, "order-by": orderByQuery, order} = req.query;

	let filteredFilms = films;

	if (minDurationQuery)
		filteredFilms = filterByDuration(Number(minDurationQuery));

	if (titleStartQuery && typeof titleStartQuery === "string")
		filteredFilms = searchByTitle(titleStartQuery);

	if (orderByQuery && typeof orderByQuery === "string") {
		const sortOrder = (order && typeof order === "string") ? order : "asc";
		filteredFilms = orderBy(orderByQuery, sortOrder);
	}
	return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);

	const film = findById(id);
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

	if (findByTitleDirector(title, director)) {
		return res.status(409).json({ message: "A film with the same title and director already exists." });
	}
	return res.json(createFilm({ title, director, duration, budget, description, imageUrl }));
});


router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	const deletedFilm = deleteFilm(id);
	if (!deletedFilm)
		return res.sendStatus(404);

	return res.json(deletedFilm);
});


router.patch("/:id", (req, res) => {

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

	const id = Number(req.params.id);

	const film = findById(id);
	if (!film) {
		return res.sendStatus(404);
	}

	patchFilm(film, {
		title: title ?? film.title,
		director: director ?? film.director,
		duration: duration ?? film.duration,
		budget: budget ?? film.budget,
		description: description ?? film.description,
		imageUrl: imageUrl ?? film.imageUrl
	});

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

	const existingFilm = findById(id);

	if (existingFilm) {
		const updatedFilm = { id, title, director, duration, budget, description, imageUrl };
		patchFilm(existingFilm, updatedFilm);
		return res.json(updatedFilm);
	} else {
		if (findByTitleDirector(title, director)) {
			return res.status(409).json({ message: "A film with the same title and director already exists." });
		}
		const newFilm: Film = { id, title, director, duration, budget, description, imageUrl };
		createFilm(newFilm);
		return res.status(201).json(newFilm);
	}
});

export default router;