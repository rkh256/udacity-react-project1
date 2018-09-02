import React, {Component} from 'react';

class Book extends Component {

  render() {
    const authors = this.props.book.authors.join(', ');
    const book = {...this.props.book};
    return(
      <div>
        <img
          src={book.imageLinks.smallThumbnail}
          alt={book.title}
        />
        <p>{book.title}</p>
        <p>{authors}</p>
      </div>
    )
  }
}

export default Book;
