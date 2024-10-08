import path from "node:path";
import { Text, NewText, Level } from "../types";
import { parse, serialize } from "../utils/json";
import { v4 as uuidv4 } from 'uuid';

const jsonDbPath = path.join(__dirname, "/../data/texts.json");

const defaultTexts: Text[] = [
	{
		id: uuidv4(),
		content: "The quick brown fox jumps over the lazy dog",
		level: Level.EASY
	},
	{
		id: uuidv4(),
		content: "The five boxing wizards jump quickly",
		level: Level.MEDIUM
	},
	{
		id: uuidv4(),
		content: "Pack my box with five dozen liquor jugs",
		level: Level.HARD
	},
];

function readAllTexts (): Text[] {
	const texts = parse(jsonDbPath, defaultTexts);
	return (texts);
}

function readById(id: string): Text | undefined {
	const texts = parse(jsonDbPath, defaultTexts);

	return (texts.find((text) => text.id === id));
}

function filterByLevel(level: Level): Text[] {
	const texts = parse(jsonDbPath, defaultTexts);

	return texts.filter((text) => {
		return text.level && text.level === level
	});
}

function createText(newText: NewText): Text | undefined {
	const texts = parse(jsonDbPath, defaultTexts);

	if ((texts.find((text) => text.content === newText.content) !== undefined))
		return undefined;

	const id = uuidv4();

	const text: Text = {id: id, ...newText}

	const updatedTexts = [...texts, text];

	serialize (jsonDbPath, updatedTexts);

	return (text);
}

function deleteText(id: string): Text | undefined {
	const texts = parse(jsonDbPath, defaultTexts);

	const index = texts.findIndex((text) => text.id === id);
	if (index === -1)
		return undefined;

	const textsDeleted = texts.splice(index, 1);
	serialize(jsonDbPath, texts);
	return (textsDeleted[0]);
}

function updateText(id: string, updatedText: NewText): Text | undefined {
	let texts = parse(jsonDbPath, defaultTexts);

	let text = texts.find((text) => text.id === id);
	if (!text)
		return undefined;

	text.content = updatedText.content;
	text.level = updatedText.level;

	serialize(jsonDbPath, texts);
	return (text);
}

export { readAllTexts, readById, filterByLevel, createText, deleteText, updateText }