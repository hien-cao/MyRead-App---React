import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ListBook from './components/ListBook'
import BookSearch from './components/BookSearch'
import './App.css'

class BookApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetchBooks()
    })
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (<ListBook books={this.state.books} onUpdate={this.updateBooks}/>)}/>
        <Route path='/search' render={(history) => (<BookSearch shelfBooks={this.state.books} onUpdate={this.updateBooks}/>)}/>
      </div>
    )
  }
}

export  default BookApp

