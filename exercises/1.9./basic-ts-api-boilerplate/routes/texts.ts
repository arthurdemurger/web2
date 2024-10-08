import { Router } from "express";
import {readAllTexts,
		readById,
		filterByLevel,
		createText,
		deleteText,
		updateText
		} from "../services/texts";
import { Level, NewText } from "../types";


const router = Router();

router.get("/", (req, res) => {
	let texts = readAllTexts();

	if (req.query.level && typeof req.query.level === "string") {
		const level = req.query.level as Level;

		if (Object.values(Level).includes(level)) {
			texts = filterByLevel(level);
		} else {
			return res.status(400).json({ error: "Invalid level parameter" });
		}
	}

	return res.json(texts);
});

router.get("/:id", (req, res) => {
	const id = req.params.id;

	const text = readById(id);
	if (!text)
		return res.sendStatus(404);
	return res.json(text);
});

router.post("/", (req, res) => {
	const body = req.body;

	if (!body || typeof body !== "object" ||
		!body.content || typeof body.content !== "string" ||
		!body.level || !Object.values(Level).includes(body.level)) {
		return res.status(400).json({ error: "Invalid body" });
	}

	const { content, level } = body as NewText;

	const newText = createText({ content, level });

	if (newText === undefined)
		return res.status(409).json({ error: "Text already exists" });

	return res.json(newText);
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;

	const text = deleteText(id);
	if (!text)
		return res.sendStatus(404);
	return res.json(text);
});

router.put("/:id", (req, res) => {
	const body = req.body;

	if (!body || typeof body !== "object" ||
		!body.content || typeof body.content !== "string" ||
		!body.level || !Object.values(Level).includes(body.level)) {
		return res.status(400).json({ error: "Invalid body" });
	}
	const text = updateText(req.params.id, body);
	if (!text)
		return res.sendStatus(404);
	return res.json(text);
});
export default router;
