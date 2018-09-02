import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
  state = {
    searchTerm: '',
    books: [],
  };

  updateQuery = (query) => {
    this.setState(() => ({
      searchTerm: query.trim(),
    }));
    BooksAPI.search(query.trim())
      .then(searchResults => {
        if (searchResults && searchResults.length > 0) {
          this.setState(() => ({
            books: searchResults,
          }));
        }
      })
      .catch(error => {
        console.error('error searching', error);
      })
  };

  render() {
    const { searchTerm, books } = this.state;
    return(
      <div>
        <div>
          <Link to='/'>
            Back
          </Link>

          <form>
            <input
              type='text'
              name='searchTerm'
              placeholder='Search For A Book By Title Or Author'
              value={searchTerm}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </form>

          <div>
            <ul>
              {
                books.map(book => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      booksOnShelf={this.props.booksOnShelf}
                      onSucessFullShelfChange={this.props.onSucessFullShelfChange}
                    />
                  </li>
                ))
              }
            </ul>
          </div>

        </div>
      </div>
    )
  }
};

export default Search;
