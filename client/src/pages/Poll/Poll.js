// Import dependencies
//--------------------------------------------------------
import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import PollGraph from "../../components/App/PollGraph";
import "./Poll.css";

const style = {
}

// Create stateful home page component
//--------------------------------------------------------
export default class Poll extends Component {
    // initial state
    state = {}

    // render DOM
    render(){

        return(
            <Container style={style.wrapper}>
                <PollGraph/>
            </Container>
        )
    }
}