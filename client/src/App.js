import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Chat } from "./pages";
import Navbar from "./components/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App-container">
          <Navbar />
          <Switch>
            <Route exact to="/" component={Chat} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
