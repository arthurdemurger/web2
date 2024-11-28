import { Router } from "express";

import { NewMovie } from "../types";

import { containsOnlyExpectedKeys } from "../utils/validate";

import {
	createOne,
	deleteOne,
	readAll,
	readOne,
	updateOne,
	updateOrCreateOne,
} from "../services/movies";

const router = Router();

const expectedKeys = [
	"title",
	"director",
	"duration",
	"budget",
	"description",
	"imageUrl",
];

// Read all Movies, filtered by minimum-duration if the query param exists
router.get("/", (req, res) => {
	const minDuration =
		"minimum-duration" in req.query
			? Number(req.query["minimum-duration"])
			: undefined;

	if (minDuration !== undefined && (isNaN(minDuration) || minDuration <= 0)) {
		return res.sendStatus(400);
	}

	const filteredMovies = readAll(minDuration);

	return res.send(filteredMovies);
});

// Read a movie by id
router.get("/:id", (req, res) => {
	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.sendStatus(400);
	}

	const movie = readOne(id);

	if (movie === undefined) {
		return res.sendStatus(404);
	}

	return res.send(movie);
});

// Create a new movie
router.post("/", (req, res) => {
	const body: unknown = req.body;

	if (
		!body ||
		typeof body !== "object" ||
		!("title" in body) ||
		!("director" in body) ||
		!("duration" in body) ||
		typeof body.title !== "string" ||
		typeof body.director !== "string" ||
		typeof body.duration !== "number" ||
		!body.title.trim() ||
		!body.director.trim() ||
		body.duration <= 0 ||
		("budget" in body &&
			(typeof body.budget !== "number" || body.budget <= 0)) ||
		("description" in body &&
			(typeof body.description !== "string" || !body.description.trim())) ||
		("imageUrl" in body &&
			(typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
	) {
		return res.sendStatus(400);
	}

	const NewMovie = body as NewMovie;

	const addedMovie = createOne(NewMovie);

	if (!addedMovie) {
		return res.sendStatus(409);
	}

	return res.json(addedMovie);
});

// Delete a movie by id
router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.sendStatus(400);
	}

	const deletedmovie = deleteOne(id);

	if (!deletedmovie) {
		return res.sendStatus(404);
	}

	return res.send(deletedmovie);
});

// Update one or multiple props of a movie
router.patch("/:id", (req, res) => {
	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.sendStatus(400);
	}

	const body: unknown = req.body;

	if (
		!body ||
		typeof body !== "object" ||
		Object.keys(body).length === 0 ||
		("title" in body &&
			(typeof body.title !== "string" || !body.title.trim())) ||
		("director" in body &&
			(typeof body.director !== "string" || !body.director.trim())) ||
		("duration" in body &&
			(typeof body.duration !== "number" || body.duration <= 0)) ||
		("budget" in body &&
			(typeof body.budget !== "number" || body.budget <= 0)) ||
		("description" in body &&
			(typeof body.description !== "string" || !body.description.trim())) ||
		("imageUrl" in body &&
			(typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
	) {
		return res.sendStatus(400);
	}

	// Challenge of ex1.6 : To be complete, we should check that the keys of the body object are only the ones we expect
	if (!containsOnlyExpectedKeys(body, expectedKeys)) {
		return res.sendStatus(400);
	}
	// End of challenge

	const updatedMovie = updateOne(id, body);

	if (!updatedMovie) {
		return res.sendStatus(404);
	}

	return res.send(updatedMovie);
});

// Update a movie only if all properties are given or create it if it does not exist and the id is not existent
router.put("/:id", (req, res) => {
	const body: unknown = req.body;

	if (
		!body ||
		typeof body !== "object" ||
		!("title" in body) ||
		!("director" in body) ||
		!("duration" in body) ||
		typeof body.title !== "string" ||
		typeof body.director !== "string" ||
		typeof body.duration !== "number" ||
		!body.title.trim() ||
		!body.director.trim() ||
		body.duration <= 0 ||
		("budget" in body &&
			(typeof body.budget !== "number" || body.budget <= 0)) ||
		("description" in body &&
			(typeof body.description !== "string" || !body.description.trim())) ||
		("imageUrl" in body &&
			(typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
	) {
		return res.sendStatus(400);
	}

	// Challenge of ex1.6 : To be complete, we should check that the keys of the body object are only the ones we expect
	if (!containsOnlyExpectedKeys(body, expectedKeys)) {
		return res.sendStatus(400);
	}

	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.sendStatus(400);
	}

	const createdOrUpdatedMovie = updateOrCreateOne(id, body as NewMovie);

	if (!createdOrUpdatedMovie) {
		return res.sendStatus(409); // movie already exists
	}

	return res.send(createdOrUpdatedMovie);
});

export default router;
