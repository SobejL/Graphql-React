'use client'

import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK , GET_BOOKS} from '../../graphql/queries';

function AddBook() {
  const { data, loading, error } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const displayAuthors = () => {
    if (loading) {
      return <option>Loading authors...</option>;
    }

    if (error) {
      return <option>Error loading authors</option>;
    }

    if (data) {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit the form data and call the GraphQL mutation
    addBook({
      variables: {
        name: formData.name,
        genre: formData.genre,
        authorId: formData.authorId,
      },
      // Will rerender data on page
      refetchQueries:[{query: GET_BOOKS}]
    }).then(() => {
      // You can handle success or navigate to another page here.
      // For example: history.push('/books');
      
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select name="authorId" value={formData.authorId} onChange={handleChange}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}

export default AddBook;
