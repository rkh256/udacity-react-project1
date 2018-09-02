import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';


class Search extends Component {
  state = {
    searchTerm: '',
  };

  updateQuery = (query) => {
    this.setState(() => ({
      searchTerm: query.trim(),
    }));
  };

  render() {
    const { searchTerm } = this.state;
    const { books } = this.props;
    let filteredBooks = [];
    if (searchTerm.length > 0) {
     filteredBooks = books.filter(b => b.title
       .toLowerCase()
       .includes(searchTerm.toLowerCase()));
    }

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
              placeHolder='Search For A Book'
              value={searchTerm}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </form>

          <div>
            <BookShelf books={filteredBooks} />
          </div>

        </div>
      </div>
    )
  }
};

export default Search;
