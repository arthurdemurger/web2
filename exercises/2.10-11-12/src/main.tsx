import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./components/HomePage";
import CinemaPage from "./components/CinemaPage";
import MoviePage from "./components/MoviePage";
import MovieListPage from "./components/MovieListPage";
import AddMoviePage from "./components/AddMoviePage";
import App from "./components/App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <HomePage />
			},
			{
				path: "/cinema",
				element: <CinemaPage />
			},
			{
				path: "/movies",
				element: <MovieListPage />
			},
			{
				path: "/add_movie",
				element: <AddMoviePage />
			},
			{
				path: "/movie_details/:id",
				element: <MoviePage />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);
