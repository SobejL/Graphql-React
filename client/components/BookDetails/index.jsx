'use client'

import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_SINGLE_BOOK } from '../../graphql/queries';

function BookDetails({ bookId }) {
  
  const { data, loading, error, } = useQuery(GET_SINGLE_BOOK, {
    variables: { id: bookId },
    
  });

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>Error loading book details</p>;
  }

  const book = data.book;

  if (book) {
    return (
      <div id="book-details">
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>No book selected...</div>;
  }
}

export default BookDetails;
