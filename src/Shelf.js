import React from 'react'
import {Link} from 'react-router-dom'
import Book from "./Book";

class Shelf extends React.Component {
	updateBook = (book, shelf) => {
		this.props.onUpdateShelf(book, shelf)
	}
	
  render() {
    return (
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
					{ this.props.books.filter(book => book.shelf === 'currentlyReading')
					.map(book => (
					<Book key={book.id} book={book} onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}/>
					))}               
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     
                     {this.props.books.map((book) =>
                            <li key={book.id}>
                          
                      <BookDetails
                      title={book.title}
                      authors={book.authors}
                      shelf={book.shelf}
                      changeShelf={this.props.changeShelf}
                      book={book}
                  />
              </li>
)}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     { this.props.books.filter(book => book.shelf === 'read')
					.map(book => (
					<Book key={book.id} book={book} onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}/>
					))}  
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
		)
	}
}

export default Shelf