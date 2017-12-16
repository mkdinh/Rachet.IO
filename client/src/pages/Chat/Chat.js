// Import dependencies
//--------------------------------------------------------
import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import Panel from "../../components/Panel";
import ChatBox from "../../components/App/ChatBox";
import "./Chat.css";

// Create stateful home page component
//--------------------------------------------------------
export default class Chat extends Component {
    // initial state
    state = {}

    // render DOM
    render(){

        const name = this.state.name;
        const messages = this.state.messages;

        return(
            <Container>
                <Grid className="Chat-wrapper">
                    <Grid.Row columns={2}>
                        <Grid.Column only="computer tablet" width={3}>
                        </Grid.Column>
                        <Grid.Column computer={10} mobile={16}>
                            <ChatBox/>
                        </Grid.Column>
                        <Grid.Column only="computer tablet" width={3}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}