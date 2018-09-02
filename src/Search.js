import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';
import './Search.css';


class Search extends Component {
  state = {
    searchTerm: '',
    books: [],
  };

  /**
  * @description this method handles the search functionality
  * @param {string} query
  */
  updateQuery = (query) => {
    this.setState(() => ({
      searchTerm: query,
    }));

    if (query.length === 0) {
      this.setState(() => ({
        books: [],
      }));
      return;
    }
    // TODO add debounce
    BooksAPI.search(query)
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
        <div className='header'>
          <div className='backButton'>
            <Link to='/'>
              <button>Back</button>
            </Link>
          </div>
          <div className='container'>My Reads Project - Search</div>
        </div>
        <div className='container container--search'>
            <div className='search-field-container'>
              <form>
                <input
                  type='text'
                  name='searchTerm'
                  placeholder='Search For A Book By Title Or Author'
                  value={searchTerm}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </form>
            </div>
            <div className='search-results-container'>
              {
                books.map(book => (
                  <div key={book.id}>
                    <Book
                      book={book}
                      booksOnShelf={this.props.booksOnShelf}
                      onSucessFullShelfChange={this.props.onSucessFullShelfChange}
                      hideNoneOption={true}
                    />
                  </div>
                ))
              }
            </div>
        </div>
      </div>
    )
  }
};

export default Search;
