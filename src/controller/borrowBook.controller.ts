import express, { Request, Response } from "express";
import { BorrowBook } from "../models/borrowBook.model";
import { Books } from "../models/book.model";

export const borrowBookRoutes = express.Router();

// create borrow book entry
borrowBookRoutes.post("/borrow", async (req: Request, res: Response) => {
  try {
    const { bookId, quantity, dueDate } = req.body;
    const borrowDetails = req.body;
    console.log("borroDetails==>", borrowDetails);
    const foundBook = await Books.findById(bookId);
    console.log(" ==>found", foundBook);
    if (!foundBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    //check enough copies are available
    if (foundBook.copies <= quantity) {
      return res.status(400).json({
        success: false,
        message: "Not engouh copies available to borrow",
      });
    }
    //reduce available copies
    await foundBook.reduceCopies(quantity); //implement instance methods
    //create borrow record
    const createBookBook = await BorrowBook.create({
      bookId: bookId,
      quantity: quantity,
      dueDate: dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: { createBookBook },
    });
  } catch (error: any) {
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
});
//get book summary
borrowBookRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const summary = await BorrowBook.aggregate([
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
          _id: 1,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error: error.message,
    });
  }
});

//get borrowBook
// borrowBookRoutes.get("/borrowBook", async (req: Request, res: Response) => {
//   try {
//     //populate books details in borrowbook model
//     const borrowBooks = await BorrowBook.find();
//     console.log("333", borrowBooks);
//     res.status(201).json({
//       success: true,
//       message: "Borrowed books fetched successfully",
//       data: borrowBooks,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching borrowed books",
//       error: error.message,
//     });
//   }
// });
