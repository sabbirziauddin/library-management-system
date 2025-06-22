"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./controller/books.controller");
const borrowBook_controller_1 = require("./controller/borrowBook.controller");
const port = 4000;
const app = (0, express_1.default)();
//middlewere
app.use(express_1.default.json());
app.use("/api", books_controller_1.booksRoutes);
app.use("/api", borrowBook_controller_1.borrowBookRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;
