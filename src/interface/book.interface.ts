//create an interface for book
export interface IBook {
  title: string;
  author: string;
  genre: "FICTION" | "NON-FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  reduceCopies: (quantiy: string) => Promise<void>;
}   