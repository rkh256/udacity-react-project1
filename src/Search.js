import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';


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
        console.log(searchResults)
        if (searchResults && searchResults.length > 0) {
          this.setState(() => ({
            books: searchResults,
          }));
        }
      })
  };

  render() {
    const { searchTerm, books } = this.state;
    console.log(books)
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
            <BookShelf books={this.state.books} />
          </div>

        </div>
      </div>
    )
  }
};

export default Search;
