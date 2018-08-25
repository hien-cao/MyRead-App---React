import React, {Component} from 'react'
import Book from './Book'
import * as BooksAPI from '../utils/BooksAPI'
import PropTypes from 'prop-types'

class BookSearch extends Component {

  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  state = {
    books: [],
    query: ''
  }

  handleSearch = evt => {
    const query = evt.target.value
    this.setState({
      query: query
    })
    this.searchBooks(query)
  }

  searchBooks = query => {
    if (query) {
      BooksAPI.search(query).then(books => {
        if (books) {
          books = books.filter(book => book.imageLinks)
          books = this.changeBookShelf(books)
          this.setState({
            books: books
          })
        }
      })
    } else {
      this.setState({
        books: [],
        query: ''
      })
    }
  }

  changeBookShelf = books => {
    let shelfBooks = this.props.shelfBooks
    for (let book of books) {
      book.shelf = 'none'
    }
    for (let book of books) {
      for (let b of shelfBooks) {
        if (b.id === book.id) {
          book.shelf = b.shelf
        }
      }
    }
    return books
  }

  updateBooks = (book, shelf) => {
    this.props.onUpdate(book, shelf)
  }

  render() {
    const {books, query} = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => ({})}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleSearch}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query && books.map((book) => (
              <Book key={book.id} book={book} onUpdate={shelf => this.updateBooks(book, shelf)}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch 