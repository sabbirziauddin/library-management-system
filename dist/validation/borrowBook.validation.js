"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookZodSchema = void 0;
const zod_1 = require("zod");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.borrowBookZodSchema = zod_1.z.object({
    bookId: zod_1.z.string({
        required_error: "Book ID is required",
    })
        .regex(objectIdRegex, "Invalid book ID format"),
    quantity: zod_1.z.number({
        required_error: "Quantity is required",
    })
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than 0"),
    dueDate: zod_1.z.string({
        required_error: "Due date is required",
    })
        .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
});
