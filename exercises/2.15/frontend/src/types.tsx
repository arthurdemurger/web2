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

interface MovieContext {
	movies: Movie[];
	setMovies: (movies: Movie[]) => void;
	addMovie: (newMovie: MovieProps) => void;
};

type NewMovie = Omit<Movie, "id">;


interface CinemaProps {
	name: string;
	movies: MovieProps[];
}

export type {Movie, MovieProps, MovieContext, CinemaProps, NewMovie};