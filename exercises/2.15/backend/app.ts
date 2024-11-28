import express from "express";
import { requestCounterMiddleware } from "./utils/counter";

import moviesRouter from "./routes/movies";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Middleware to count the number of GET requests */
let requestCount = 0;
app.use((req, _res, next) => {
  if (req.method === "GET") {
    requestCount++;
    console.log(`GET counter : ${requestCount}`);
  }
  next();
});

/* Challenge of ex1.2 */
app.use(requestCounterMiddleware);

app.use("/movies", moviesRouter);


export default app;
