
import { Types } from "mongoose";

export interface IBookBorrow extends Document {
    bookId: Types.ObjectId;
    quantity:number;
    dueDate: Date;
    

}