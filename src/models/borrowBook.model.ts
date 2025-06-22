import { model, Schema } from "mongoose";
import { IBookBorrow } from "../interface/bookBorrow.interface";

const borrowBookSchema = new Schema<IBookBorrow>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const BorrowBook = model<IBookBorrow>("BorrowBook", borrowBookSchema);
