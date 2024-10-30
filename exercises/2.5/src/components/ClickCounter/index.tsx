import { useState } from 'react';
import './ClickCounter.css';

interface ClickCounterProps {
	title: string;
	clickMessage: string;
	mouseMessage: string;
}

const ClickCounter = ({ title, clickMessage, mouseMessage }: ClickCounterProps) => {
	const [count, setCount] = useState(0);
	const [isMouseOn, setIsMouseOn] = useState(false);

	return (
		<div className="card">
			<h2>{title}</h2>
			<button
				onClick={() => setCount((count) => count + 1)}
				onMouseEnter={() => setIsMouseOn(true)}
				onMouseLeave={() => setIsMouseOn(false)}
			>
				{isMouseOn && <span className="mouse-message">{mouseMessage}</span>}
				<div className="clickable-area">
					count is {count}
				</div>
				{count >= 10 && <span className="click-message">{clickMessage}</span>}
			</button>
		</div>
	);
};

export default ClickCounter;