// dataFunctions.js
import Book from './model/bookModel.js';
import Author from './model/authorModel.js';

const createData = async () => {
  try {
    const authors = [
      { name: 'Patrick Rothfuss', age: 44 },
      { name: 'Brandon Sanderson', age: 42 },
      { name: 'Terry Pratchett', age: 66 },
    ];

    // Insert authors into the database
    const insertedAuthors = await Author.insertMany(authors);

    if (!insertedAuthors || insertedAuthors.length === 0) {
      throw new Error('Failed to insert authors into the database.');
    }

    // Associate authors with books (using their generated _id)
    const books = [
      { name: 'Name of the Wind', genre: 'Fantasy', authorId: insertedAuthors[0]._id },
      { name: 'The Final Empire', genre: 'Fantasy', authorId: insertedAuthors[1]._id },
      { name: 'The Hero of Ages', genre: 'Fantasy', authorId: insertedAuthors[1]._id },
      { name: 'The Long Earth', genre: 'Sci-Fi', authorId: insertedAuthors[2]._id },
      { name: 'The Colour of Magic', genre: 'Fantasy', authorId: insertedAuthors[2]._id },
      { name: 'The Light Fantastic', genre: 'Fantasy', authorId: insertedAuthors[2]._id },
    ];

    // Insert books into the database
    const insertedBooks = await Book.insertMany(books);

    if (!insertedBooks || insertedBooks.length === 0) {
      throw new Error('Failed to insert books into the database.');
    }

    console.log('Authors and related books inserted into the database');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};


// Function to delete all books
async function deleteAllBooks() {
  try {
    const deleteResult = await Book.deleteMany({});
    return `Deleted ${deleteResult.deletedCount} books`;
  } catch (error) {
    throw new Error(`Error deleting books: ${error}`);
  }
}

// Function to delete all authors
async function deleteAllAuthors() {
  try {
    const deleteResult = await Author.deleteMany({});
    return `Deleted ${deleteResult.deletedCount} authors`;
  } catch (error) {
    throw new Error(`Error deleting authors: ${error}`);
  }
}

// Function to delete all books and authors
async function deleteAllData() {
  try {
    await Book.deleteMany({});
    await Author.deleteMany({});
    return 'Deleted all books and authors';
  } catch (error) {
    throw new Error(`Error deleting all data: ${error}`);
  }
}

export { deleteAllBooks, deleteAllAuthors, deleteAllData, createData };
