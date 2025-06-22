import express, { Request, Response } from "express";
import { Books } from "../models/book.model";
import { createBookZodSchema } from "../validation/book.validatation";

export const booksRoutes = express.Router();

//create book route
booksRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    const parsedBooksData = createBookZodSchema.safeParse(req.body);
    if (!parsedBooksData.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error: parsedBooksData.error.flatten(),
      });
    }

    const createBook = await Books.create(parsedBooksData.data);
    res.status(201).json({
      success: true,
      message: "Book create successfully",
      data: createBook,
    });
  } catch (error: any) {
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
});

//get all books route
// GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5

booksRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
    } = req.query;

    // Build query object
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    // Sort direction
    const sortOrder = sort === "desc" ? -1 : 1;

    // Execute query
    const books = await Books.find(query)
      .sort({ [sortBy as string]: sortOrder })
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving books",
      error: error.message,
    });
  }
});

//get single book route by bookId
booksRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const book = await Books.findById(bookId);
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error.message,
    });
  }
});

//delete book route by bookId
booksRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const deletedBook = await Books.findByIdAndDelete(bookId);
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting book",
      error: error.message,
    });
  }
});
//update book route by bookId
booksRoutes.patch("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  console.log("BookID", bookId);
  const updateData = req.body;

  try {
    const updatedBook = await Books.findByIdAndUpdate(bookId, updateData, {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error: error.message,
    });
  }
});
