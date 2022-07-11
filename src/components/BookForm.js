import React, { useContext, useState } from 'react'
import { BookContext } from '../contexts/BookContext'

const NewBookForm = () => {
  const { addBook } = useContext(BookContext)
  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addBook({ title, author })
    setTitle('')
    setAuthor('')
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Book Title</label>
      <input type="text" placeholder='title' onChange={(e) => setTitle(e.target.value)} value={title}/>

      <label>Book Author</label>
      <input type="text" placeholder='author' onChange={(e) => setAuthor(e.target.value)} value={author}/>

      <button type="submit">Add book</button>

    </form>
  )
}

export default NewBookForm;
