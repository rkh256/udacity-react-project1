import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './Book.css';

class Book extends Component {
  state = {
    shelfValue: 'move'
  };

  /**
  * @description This method gets passed down to the Book Component
  * @param {event} event
  */
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

  /**
  * @description Updates the book and calls onSucessFullShelfChange which
  * is passed in from the App component
  * @param {event} event
  */
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
    const hasThumbNail =
      book.imageLinks && book.imageLinks.smallThumbnail ? true : false;

    return(
      <div className='book'>
        {hasThumbNail &&
          <img
            src={book.imageLinks.smallThumbnail}
            alt={book.title}
          />
        }
        {!hasThumbNail &&
          <div className='broken-image'>
            <div className='broken-image-icon'></div>
            <p>No Image</p>
          </div>
        }
        <div className='book-meta-text'>
          <p className='book-title'>{book.title}</p>
          <p className='book-authors'>{authors}</p>
        </div>
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
