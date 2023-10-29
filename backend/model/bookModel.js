import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Reference the "Author" model
  },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
