import { z } from "zod";


const objectIdRegex = /^[0-9a-fA-F]{24}$/;
export const borrowBookZodSchema = z.object({
  bookId: z.string({
      required_error: "Book ID is required",
    })
    .regex(objectIdRegex, "Invalid book ID format"),

  quantity: z.number({
      required_error: "Quantity is required",
    })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),

  dueDate: z.string({
      required_error: "Due date is required",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
});