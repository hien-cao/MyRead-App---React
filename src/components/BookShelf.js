import React, {Component} from 'react'
import Book from './component/Book'

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title"></h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <Book/>
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf