// Importerar Book-modellen
import Book from "../models/Book";

// GET /api/books
// Hämtar alla böcker
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    // Om något går fel skickas ett serverfel
    res.status(500).json({ message: "Could not fetch books" });
  }
};

// GET /api/books/:id
// Hämtar en specifik bok
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    // Om något går fel skickas ett serverfel
    res.status(500).json({ message: "Could not fetch book" });
  }
};

// POST /api/books
// Skapar en ny bok
export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json(book);
  } catch (error) {
    // Om något går fel skickas ett serverfel
    res.status(500).json({ message: "Could not create book" });
  }
};

// PATCH /api/books/:id
// Uppdaterar en befintlig bok
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    // Om något går fel skickas ett serverfel
    res.status(500).json({ message: "Could not update book" });
  }
};

// DELETE /api/books/:id
// Raderar en bok
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    // Om något går fel skickas ett serverfel
    res.status(500).json({ message: "Could not delete book" });
  }
};