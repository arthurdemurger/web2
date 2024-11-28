import './App.css';
import DogImage from '../DogImage';
import { useEffect, useState } from 'react';

function App() {
	const [keys, setKeys] = useState([
		String(Date.now() + Math.random()),
		String(Date.now() + Math.random() * 2),
		String(Date.now() + Math.random() * 3)
	]);

	useEffect(() => {
		const interval = setInterval(() => {
			setKeys([
				String(Date.now() + Math.random()),
				String(Date.now() + Math.random() * 2),
				String(Date.now() + Math.random() * 3)
			])
		}, 5000);
		return () => clearInterval(interval);
	});

	return (
		<div className="image-container">
			<div className="images">
				<DogImage dogImageKey={keys[0]}/>
				<DogImage dogImageKey={keys[1]}/>
				<DogImage dogImageKey={keys[2]}/>
			</div>
		</div>
	);
}

export default App;
