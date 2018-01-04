import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Chat, Poll, PowerPoint } from "./pages";
import Slides from "./components/App/PowerPoint";
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
            <Route exact path="/Chat Box" component={Chat} />
            <Route exact path="/Poll" component={Poll} />
            <Route exact path="/PowerPoint" component={PowerPoint} />
            <Route exact path="/PowerPoint/:id" component={Slides} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
