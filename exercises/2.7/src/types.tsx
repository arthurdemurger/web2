interface Film {
	id: number;
	title: string;
	director: string;
	duration: number;
	imageUrl?: string;
	description?: string;
	budget?: number;
}

export type {Film};