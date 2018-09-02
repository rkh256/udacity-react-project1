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

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <div>
            main
            <BookShelf books={this.state.books} />
            <div className = 'search-button'>
              <Link to='/search'>
                +
              </Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
            <div>
              <Search books={this.state.books}/>
            </div>
        )} />


      </div>
    );
  }
}

export default App;
