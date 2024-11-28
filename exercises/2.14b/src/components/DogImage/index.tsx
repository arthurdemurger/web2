import { useEffect, useState } from "react";
import "./DogImage.css"

interface DogImageProps {
	dogImageKey: string;
}

const DogImage = ({dogImageKey} : DogImageProps) => {
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
	}, [dogImageKey]);

	return (
		<img src={image} alt="Dog" className="image" />
	);
};

export default DogImage;