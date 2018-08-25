import React, {Component} from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'


class ListBook extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  render() {
    const books = this.props.books
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <BookShelf books={books.filter(book => book.shelf === 'currentlyReading')} name='Currently Reading' onUpdate={this.props.onUpdate}/>
          <BookShelf books={books.filter(book => book.shelf === 'read')} name='Read' onUpdate={this.props.onUpdate}/>
          <BookShelf books={books.filter(book => book.shelf === 'wantToRead')} name='Want to Read' onUpdate={this.props.onUpdate}/>
        </div>
        <div className='open-search'>
          <a onClick={() => ({})}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBook

