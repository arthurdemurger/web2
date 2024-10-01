import express, { ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";
import filmRouter from "./routes/films";

const app = express();

// let counter = 0;
app.use((_req, _res, next) => {
	// if (_req.method === "GET")
	// 	counter++;
	// console.log(
	// 	"GET counter : " + counter
	// );
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/films", filmRouter);


const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	console.error(err.stack);
	return res.status(500).send("Something broke!");
};

app.use(errorHandler);
export default app;
