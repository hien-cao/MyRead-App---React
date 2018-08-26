import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

function ListBook(props) {
  const books = props.books
  const onUpdate = props.onUpdate
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <BookShelf books={books.filter(book => book.shelf === 'currentlyReading')} name='Currently Reading' onUpdate={onUpdate}/>
        <BookShelf books={books.filter(book => book.shelf === 'read')} name='Read' onUpdate={onUpdate}/>
        <BookShelf books={books.filter(book => book.shelf === 'wantToRead')} name='Want to Read' onUpdate={onUpdate}/>
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

ListBook.proTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default ListBook

