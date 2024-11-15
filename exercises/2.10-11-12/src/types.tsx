interface Movie {
	id: number;
	title: string;
	director: string;
	duration: number;
	imageUrl?: string;
	description?: string;
	budget?: number;
}

interface MovieProps {
	title: string;
	director: string;
	duration: number;
	imageUrl?: string;
	description?: string;
	budget?: number;
}

export type {Movie};
export type {MovieProps};