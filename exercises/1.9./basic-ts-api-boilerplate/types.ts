
interface Film {
	id: number;
	title: string;
	director: string;
	duration: number;
	budget?: number;
	description?: string;
	imageUrl?: string;
}

type NewFilm = Omit<Film, "id">;

enum Level {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard"
}

interface Text {
	id: string;
	content: string;
	level: Level;
}

type NewText = Omit<Text, "id">;

export type { Film, NewFilm, Text, NewText };
export { Level };