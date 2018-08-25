import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../utils/BooksAPI'
import PropTypes from 'prop-types'

class BookSearch extends Component {

  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  state = {
    searchBooks: [],
    query: '',
  }

  handleSearch = evt => {
    const query = evt.target.value.trim()
    this.setState({
      query: query
    })
    this.searchBooks(query)
  }

  searchBooks = query => {
    if (query) {
      BooksAPI.search(query, 20).then(books => {
        if (books) {
          books = books.filter(book => book.imageLinks)
          books = this.changeBookShelf(books)
          this.setState({
            searchBooks: books
          })
        }
      })
    } else {
      this.setState({
        searchBooks: [],
        query: ''
      })
    }
  }

  changeBookShelf = books => {
    let shelfBooks = this.props.shelfBooks
    for (let book of books) {
      book.shelf = 'none'
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
    const {searchBooks, query} = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleSearch}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query && searchBooks.map((book) => (
              <Book key={book.id} book={book} onUpdate={shelf => this.updateBooks(book, shelf)}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch 