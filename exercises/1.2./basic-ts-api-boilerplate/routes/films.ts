import { Router } from "express";
import { Film } from "../types";

const router = Router();

const defaultFilm : Film[] = [

  {
	id: 1,
	title: "The Shawshank Redemption",
	director: "Frank Darabont",
	duration: 142,
	budget: 25000000,
	description: "Two imprisoned",
	imageUrl: "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"
  },
  {
	id: 2,
	title: "The Godfather",
	director: "Francis Ford Coppola",
	duration: 175,
	budget: 6000000,
	description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
	imageUrl: "https://www.imdb.com/title/tt0068646/mediaviewer/rm10105600/?ref_=tt_ov_i"
  },
  {
	id: 3,
	title: "The Dark Knight",
	director: "Christopher Nolan",
	duration: 152,
	budget: 185000000,
	description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
	imageUrl: "https://www.imdb.com/title/tt0468569/mediaviewer/rm10105600/?ref_=tt_ov_i"
  },
];

router.get("/", (_req, res) => {
	  res.json(defaultFilm);
});

export default router;