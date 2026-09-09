// Importera Mongoose för att kunna skapa en model för böcker
import mongoose from "mongoose";

// Skapar ett schema för hur en bok ska se ut i databasen
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  genres: {
    type: [String],
    required: true
  },

  image: {
    type: String,
    required: true
  },

  published_year: {
    type: Number,
    required: true
  }

});

// Skapa och exporterar Book-modellen
export default mongoose.model("Book", bookSchema);