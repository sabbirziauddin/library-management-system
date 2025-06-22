"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const book_validatation_1 = require("../validation/book.validatation");
exports.booksRoutes = express_1.default.Router();
//create book route
exports.booksRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBooksData = book_validatation_1.createBookZodSchema.safeParse(req.body);
        if (!parsedBooksData.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error: parsedBooksData.error.flatten(),
            });
        }
        const createBook = yield book_model_1.Books.create(parsedBooksData.data);
        res.status(201).json({
            success: true,
            message: "Book create successfully",
            data: createBook,
        });
    }
    catch (error) {
        console.error("Book creation failed:", error);
        res.status(400).json({
            success: false,
            message: "Book creation failed",
            error: {
                name: error.name,
                errors: error.errors || error.message,
            },
        });
    }
}));
//get all books route
// GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
exports.booksRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10", } = req.query;
        // Build query object
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        // Sort direction
        const sortOrder = sort === "desc" ? -1 : 1;
        // Execute query
        const books = yield book_model_1.Books.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(Number(limit));
        if (books.length === 0) {
            res.status(404).json({
                success: false,
                message: "No books found for the given genre",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving books",
            error: error.message,
        });
    }
}));
//get single book route by bookId
exports.booksRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const book = yield book_model_1.Books.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book fetched successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching book",
            error: error.message,
        });
    }
}));
//delete book route by bookId
exports.booksRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const deletedBook = yield book_model_1.Books.findByIdAndDelete(bookId);
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deletedBook,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting book",
            error: error.message,
        });
    }
}));
//update book route by bookId
exports.booksRoutes.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    console.log("BookID", bookId);
    const updateData = req.body;
    try {
        const updatedBook = yield book_model_1.Books.findByIdAndUpdate(bookId, updateData, {
            new: true,
        });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating book",
            error: error.message,
        });
    }
}));
