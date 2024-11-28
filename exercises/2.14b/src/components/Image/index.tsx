import { useEffect, useState } from "react";
import "./Image.css"

interface ImageProps {
	imageKey: string;
}
const Image = ({ imageKey }: ImageProps) => {
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
	}, [imageKey]);

	return (
		<img src={image} alt="Dog" className="image" />
	);
};

export default Image;