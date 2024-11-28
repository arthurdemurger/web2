import { useEffect, useState } from "react";
import "./DogImage.css"

const DogImage = () => {
	const [image, setImage] = useState("");

	useEffect(() => {
		const fetchDogs = async () => {
			try {
				const response = await fetch("https://dog.ceo/api/breeds/image/random");

				if (!response.ok)
					throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
				const data = await response.json();

				setImage(data.message);
			} catch (err) {
				console.error("Image::error: ", err);
			}
		}

		fetchDogs();

		const interval = setInterval(() => {
			fetchDogs();
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<img src={image} alt="Dog" className="image" />
	);
};

export default DogImage;