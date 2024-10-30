import { useState } from 'react'

interface ClickCounterProps {
	title: string;
	message: string;
}

const ClickCounter = ({title, message}: ClickCounterProps) => {
	const [count, setCount] = useState(0);

	return (
		<div className="card">
			<p>{title}</p>
			<button onClick={() => setCount((count) => count + 1)}>
				count is {count}
				{count >= 10 && <span><br/><br/>{message}</span>}
			</button>
		</div>
);
}

export default ClickCounter;