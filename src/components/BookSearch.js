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
    searchError: false
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
      BooksAPI.search(query).then(books => {
        if (books.length > 0) {
          books = this.changeBookShelf(books)
          this.setState({
            searchBooks: books
          })
        } else {
          this.setState({
            searchBooks: [],
            searchError: true
          })
        }
      })
    } else {
      this.setState({
        searchBooks: [],
        query: '',
        searchError: false
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
    const {searchBooks, query, searchError} = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleSearch}/>
          </div>
        </div>
        <div className="search-books-results">
          {searchBooks.length > 0 && <h3 className='search-result-statement'>The search finds {searchBooks.length} books</h3>}
          <ol className="books-grid">
            {searchBooks.length > 0 && searchBooks.map((book) => (
              <Book key={book.id} book={book} onUpdate={shelf => this.updateBooks(book, shelf)}/>
            ))}
          </ol>
          {searchError && (
            <h3 className='search-result-statement'>The search finds {searchBooks.length} books. Please try again!</h3>
          )}
        </div>
      </div>
    )
  }
}

export default BookSearch 