import './App.css';
import DogImage from '../DogImage';

function App() {
	return (
		<div className="image-container">
			<div className="images">
				<DogImage />
				<DogImage />
				<DogImage />
			</div>
		</div>
	);
}

export default App;
