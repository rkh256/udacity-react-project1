import React, {Component} from 'react';

class Book extends Component {

  render() {
    const book = {...this.props.book};
    const authors = book.authors ? book.authors.join(', ') : '';
    const thumbNail =
      book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : '';

    return(
      <div>
        <img
          src={thumbNail}
          alt={book.title}
        />
        <p>{book.title}</p>
        <p>{authors}</p>

      </div>
    )
  }
}

export default Book;
