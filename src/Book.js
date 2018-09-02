import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  state = {
    shelfValue: ''
  };

  componentDidMount = () => {
    if (!this.props.book.shelf) {
      let bookOnShelf = this.props.booksOnShelf
        .find(b => b.id === this.props.book.id);
        if (bookOnShelf) {
          this.setState({shelfValue: bookOnShelf.shelf})
        }
    } else {
      this.setState({shelfValue: this.props.book.shelf});
    }
  };

  handleChange = event => {
    this.setState({shelfValue: event.target.value});
    BooksAPI.update(this.props.book, event.target.value)
      .then(updateResponse => {
        this.props
          .onSucessFullShelfChange(this.props.book, this.state.shelfValue);
      })
      .catch(error => {
        console.log('Update Error', error);
      })
  };

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
        <div className="book-shelf-changer">
            <select value={this.state.shelfValue} onChange={this.handleChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
      </div>
    )
  }
}

export default Book;
