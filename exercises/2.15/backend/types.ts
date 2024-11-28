interface Movie {
	id: number;
	title: string;
	director: string;
	duration: number;
	imageUrl?: string;
	description?: string;
	budget?: number;
}

type NewMovie = Omit<Movie, "id">;

export type { Movie, NewMovie };
