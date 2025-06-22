
import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./controller/books.controller";
import { borrowBookRoutes } from "./controller/borrowBook.controller";
const app: Application = express();
const port = 4000;
//middlewere
app.use(express.json());

app.use("/api", booksRoutes);
app.use("/api", borrowBookRoutes);

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});


export default app;