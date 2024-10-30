import { useState } from "react";

const ColorChange = () => {
	const [currentColor, setCurrentColor] = useState(0);
	const [nextColor, setNextColor] = useState(1);
	const colors = ["red", "green", "blue", "yellow", "violet"];

	const handleClick = () => {
		setCurrentColor((currentColor + 1) % colors.length);
		setNextColor((nextColor + 1) % colors.length);
	}
	return (
		<div style={{
		  width: '200px',
		  height: '200px',
		  backgroundColor: colors[currentColor],
		  padding: '20px',
		  margin: '10px',
		  color: 'black'
		}}>
			<button onClick={handleClick}>
				{colors[nextColor]}
			</button>
			<p>
				{colors[currentColor]}
			</p>
		</div>
	);
}

export default ColorChange;