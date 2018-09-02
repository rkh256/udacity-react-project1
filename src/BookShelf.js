import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {

    render() {
      const { books } = this.props;
      return(
        <ul>
          {
            books.map(book => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))
          }
        </ul>
      );
    }
};

export default BookShelf;
