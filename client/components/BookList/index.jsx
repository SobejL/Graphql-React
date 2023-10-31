'use client'

import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/queries";
import BookDetails from '../BookDetails';

function BookList() {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [bookId, setBookId] = useState(null);

  const showBookDetails = (id) => {
    setBookId(id);
  };

  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h2>Books</h2>
          <ul id="book-list">
            {data && data.books.map(book => (
              <li key={book.id}>
                {book.name}
                <button onClick={() => showBookDetails(book.id)}>Details</button>
              </li>
            ))}
          </ul>
          <BookDetails bookId={bookId} />
        </div>
      )}
    </div>
  );
}

export default BookList;
