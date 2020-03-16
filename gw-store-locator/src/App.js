import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import StoreFinder from './components/store-finder.component.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="container">
              <h2> Store Locator</h2>
            </div>
            <Route path='/' exact component={StoreFinder}/>
        </Router>
    );
  }
}

export default App;