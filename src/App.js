import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import BookShelf from './BookShelf';
import RouteNotFound from './RouteNotFound';
import './App.css';

class App extends Component {

  state = {
    books: []
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(BookData => {
        console.log(BookData);
        this.setState(() => ({books: BookData}));
      });
  }

  /**
  * @description Gets passed down to the Book Componenet. Looks for
  * the modified book in shelves. If its found its shelf property
  * gets updated. If not found the book is added to the shelves with
  * the correct shelf property.
  * @param {event} event
  */
  onSucessFullShelfChange = (book, shelf) => {
    let books = [...this.state.books];
    let bookToUpdateIndex = books.findIndex(b => b.id === book.id);
    if (bookToUpdateIndex !== -1) {
        books[bookToUpdateIndex].shelf = shelf;
    } else {
      book.shelf = shelf;
      books.unshift(book);
    }
    this.setState({books: books.filter(b => b.shelf !== 'none')});
  };

  render() {
    const readBooks = this.state.books.filter(b => b.shelf === 'read');
    const wantToReadBooks =
      this.state.books.filter(b => b.shelf === 'wantToRead');
    const currentlyReadingBooks =
      this.state.books.filter(b => b.shelf === 'currentlyReading');

    return (
      <div className='bookshelf-app'>
        <Switch>
          <Route exact path='/' render={() => (
            <div>
              <div className='header'>
                <div className='container'>My Reads Project</div>
              </div>
              <div className='container'>
                <h1>Currently Reading</h1>
                <hr/>
                <BookShelf
                  books={currentlyReadingBooks}
                  onSucessFullShelfChange={this.onSucessFullShelfChange}
                />
                <h1>Want To Read</h1>
                <hr/>
                <BookShelf
                  books={wantToReadBooks}
                  onSucessFullShelfChange={this.onSucessFullShelfChange}
                />
                <h1>Read</h1>
                <hr/>
                <BookShelf
                  books={readBooks}
                  onSucessFullShelfChange={this.onSucessFullShelfChange}
                />
                <div className = 'search-button'>
                  <Link to='/search'>
                    +
                  </Link>
                </div>
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
          <Route component={RouteNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
