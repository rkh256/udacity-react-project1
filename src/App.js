import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import BookShelf from './BookShelf';
import './App.css';

class App extends Component {

  state = {
    books: []
  };

  componentDidMount = () => {
    console.log('mounted');
    BooksAPI.getAll()
      .then(BookData => {
        console.log(BookData);
        this.setState(() => ({books: BookData}));
      });
  }

  onSucessFullShelfChange = (book, shelf) => {
    console.log(book);
    let books = [...this.state.books];
    let bookToUpdateIndex = books.findIndex(b => b.id === book.id);
    if (bookToUpdateIndex !== -1) {
      books[bookToUpdateIndex].shelf = shelf;
    }
    this.setState({books: books})
  };

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <div>
            main
            <BookShelf
              books={this.state.books}
              onSucessFullShelfChange={this.onSucessFullShelfChange}
            />
            <div className = 'search-button'>
              <Link to='/search'>
                +
              </Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
            <div>
              <Search
                booksOnShelf={this.state.books}
                onSucessFullShelfChange={this.onSucessFullShelfChange}
              />
            </div>
        )} />


      </div>
    );
  }
}

export default App;
