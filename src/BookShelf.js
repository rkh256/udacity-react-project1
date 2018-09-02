import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {

    render() {
      const { books } = this.props;
      return(
        <div className='shelf-container'>
          {
            books.map(book => (
              <div key={book.id}>
                <Book
                  book={book}
                  onSucessFullShelfChange={this.props.onSucessFullShelfChange}
                />
              </div>
            ))
          }
        </div>
      );
    }
};

export default BookShelf;
