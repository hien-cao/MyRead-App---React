import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  updateBooks = (book, shelf) => {
    this.props.onUpdate(book, shelf)
  }

  render() {
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => (
              <Book key={index} book={book} onUpdate={(shelf) => {
                this.updateBooks(book, shelf)
              }}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf