
  import React, {Component} from 'react'
  import './App.css'
  import ListBook from "./ListBook"
  import {Route, Link} from 'react-router-dom'
  import * as BooksAPI from './BooksAPI'
  import Book from "./Book";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Books: [],
      Searched: [],
      showSearchPage: false
    };
  }

  
    updateShelf = (book, shelf) => {
      BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat([book])
        }));
      })
      .then(() => {
        this.setState((prevState) => {
          return {
            books: prevState.books.map(searchedBook => {
              if (book.id === searchedBook.id) {
                searchedBook.shelf = shelf
              }
              return searchedBook;
            })
          }
        })
})
  
      BooksAPI.update(book, shelf).then((data) => {
      })
    }

    componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })
    }
      updateQuery = (query) => {
      this.setState({query: query})
      let filteredBooks = []
      if (query) {
        BooksAPI.search(query).then(response => {
          if (response.length) {
            filteredBooks = response.map(b => {
              const index = this.state.books.findIndex(c => c.id === b.id)
              if( index >= 0 ) {
                return this.state.books[index]
              } else {
                return b
              }
            })
          }
          this.setState({filteredBooks})
        })
      }
      else {
        this.setState({filteredBooks})
      }
    }
  
    render() {
      const {query} = this.state
      return (
        <div className="app">
  
            <Route exact path="/search" render={() => (
              <div className="search-books">
                <div className="search-books-bar">
                  <Link className="close-search" to="/">Close</Link>
                  <div className="search-books-input-wrapper">
                    <input type="text"
                           placeholder="Search"
                           value={query}
                           onChange={(event) => this.updateQuery(event.target.value)}
                    />
  
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                    {this.state.filteredBooks.map((book, i) => (
                      <Book key={i} book={book}
                            onUpdateBook={(book, shelf) => this.updateShelf(book, shelf)}/>
                    ))}
                  </ol>
                </div>
              </div>
            )} />
            <Route exact path="/" render={() => (
              <ListBook books={this.state.books}
                         onUpdateShelf={(book, shelf) => this.updateShelf(book, shelf)}/>
            )}/>
  
        </div>
      )
    }
  }
  
  export default BooksApp