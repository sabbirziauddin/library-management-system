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
exports.borrowBookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrowBook_model_1 = require("../models/borrowBook.model");
const book_model_1 = require("../models/book.model");
const borrowBook_validation_1 = require("../validation/borrowBook.validation");
exports.borrowBookRoutes = express_1.default.Router();
// create borrow book entry
exports.borrowBookRoutes.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedborrowBooksData = borrowBook_validation_1.borrowBookZodSchema.safeParse(req.body);
        console.log("parsedborrowBooksData==>", parsedborrowBooksData.data);
        if (!parsedborrowBooksData.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error: parsedborrowBooksData.error.flatten(),
            });
        }
        const { bookId, quantity, dueDate } = parsedborrowBooksData.data;
        const foundBook = yield book_model_1.Books.findById(bookId);
        if (!foundBook || foundBook.copies === 0) {
            res.status(404).json({
                success: false,
                message: "Book  not  available to borrow",
            });
            return;
        }
        //check enough copies are available
        if (foundBook.copies < quantity) {
            res.status(400).json({
                success: false,
                message: "Not engouh copies available to borrow",
            });
            return;
        }
        //reduce available copies
        yield foundBook.reduceCopies(quantity.toString()); //implement instance methods
        //create borrow record
        const createBookBook = yield borrowBook_model_1.BorrowBook.create({
            bookId: bookId,
            quantity: quantity,
            dueDate: dueDate,
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: { createBookBook },
        });
    }
    catch (error) {
        console.error("Borrow book creation failed:", error);
        res.status(400).json({
            success: false,
            message: "Borrow book creation failed",
            error: {
                name: error.name,
                errors: error.errors || error.message,
            },
        });
    }
}));
//get book summary
exports.borrowBookRoutes.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrowBook_model_1.BorrowBook.aggregate([
            {
                $group: {
                    _id: "$bookId",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            {
                $unwind: "$bookInfo",
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn",
                    },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrowed books summary",
            error: error.message,
        });
    }
}));
