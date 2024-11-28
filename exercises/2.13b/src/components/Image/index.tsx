import { useEffect, useState } from "react";
import "./Image.css"

interface ImageProps {
	imageKey: string;
}
const Image = ( {imageKey}: ImageProps) => {
	const [image, setImage] = useState("");

	useEffect(() => {
		fetch("https://dog.ceo/api/breeds/image/random")
			.then((response) => {
				if (!response.ok)
					throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
				return (response.json());
			})
			.then((data) => {
				return (setImage(data.message));
			})
			.catch((err) => {
				console.error("Image::error: ", err);
			})
	}, [imageKey]);

	return (
			<img src={image} alt="Dog" className="image" />
	);
};

export default Image;