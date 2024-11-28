import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [joke, setJoke] = useState("");

	useEffect(() => {
		fetch("https://v2.jokeapi.dev/joke/Any?type=single")
			.then((response) => {
				if (!response.ok)
					throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
				return response.json();
			})
			.then((jokeRequest) => setJoke(jokeRequest.joke))
			.catch((err) => {
				console.error("Homepage::error: ", err)
			}
			);
	}, []);

	return (
		<>
			<div className="joke-container">
				<p className="joke-text">{joke}</p>
			</div>
		</>
	)
}

export default App
