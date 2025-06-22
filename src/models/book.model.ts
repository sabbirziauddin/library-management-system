import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

//create schema

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
        type: String,
        uppercase: true,
        enum: {
        values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY"],
        message: "{VALUE} is not a valid genre",
      },
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);
//create instance method to reduce copies
bookSchema.methods.reduceCopies = async function (
  quantity: number
): Promise<void> {
  this.copies -= quantity;
  if (this.copies <= 0) {
    this.copies = 0;
    this.available = false;
  }
  await this.save();
};

//create Model for schema
 export const Books = model<IBook>("Books",bookSchema);

