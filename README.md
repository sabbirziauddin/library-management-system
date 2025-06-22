# library-management-system

vercel app for library management system domain live linkd :
https://library-management-backend-ten.vercel.app/


# 📚 Library Management System (Node.js + Express)
A RESTful API for managing books and borrow records, built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- Add, update, delete, and view books
- Filter and sort books by genre and date
- Borrow books with copy tracking
- View borrow summary (aggregated)
- Input validation with Zod
- MongoDB integration with Mongoose

---

## ⚙️ Getting Started

1. **Clone the repo**  
   `git clone https://github.com/sabbirziauddin/library-management-system.git`
   

2. **Install dependencies**  
   `npm install`

3. **Setup `.env` file**
   
   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual credentials.

4. **Run the server**  
   For development with auto-reload:
   ```bash
   npm run dev
   ```
   For production:
   ```bash
   npm start
   ```

---

## 🛠️ API Endpoints

### Books

- `GET /api/books` — List all books
- `GET /api/books/:id` — Get a single book
- `POST /api/books` — Add a new book
- `PATCH /api/books/:id` — Update a book
- `DELETE /api/books/:id` — Delete a book

### Borrow Records

- `POST /api/borrow` — Borrow a book
- `GET /api/borrow/` — View borrow summary

---

## 🧪 Testing

You can use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API endpoints.

---

## 📄 License

This project is licensed under the MIT License.
