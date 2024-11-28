import './App.css';
import Image from '../Image';
import { useState } from 'react';

function App() {
	const [keys, setKeys] = useState([
		String(Date.now() + Math.random()),
		String(Date.now() + Math.random() * 2),
		String(Date.now() + Math.random() * 3)
	]);


	const handleClick = () => {
		setKeys([
			String(Date.now() + Math.random()),
			String(Date.now() + Math.random() * 2),
			String(Date.now() + Math.random() * 3)
		]);
	};

	return (
		<div className="image-container">
			<div className="images">
				<Image imageKey={keys[0]} />
				<Image imageKey={keys[1]} />
				<Image imageKey={keys[2]} />
			</div>
			<button onClick={handleClick}>Refresh</button>
		</div>
	);
}

export default App;
