import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Chat, Poll } from "./pages";
import Navbar from "./components/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App-container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Chat} />
            <Route exact path="/Poll" component={Poll} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
