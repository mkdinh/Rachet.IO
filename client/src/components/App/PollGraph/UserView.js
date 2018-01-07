// Import React
//--------------------------------------------------------
import React, { Component } from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import Graph from "./Graph";
import Panel from "../../Panel";

const style = {
    wrapper: {  },
    divider: { margin: 0 },
    notification: { textAlign: "center" },
    choices: { 
        display: "flex", 
        justifyContent: "center", 
        itemsAlign: "cneter", 
        flexWrap: "wrap" 
    },
    choice: { 
        minWidth: window.screen.width > 768 ? "25%" : "100%", 
        margin: "0.25rem", 
        overflow: "hidden", 
        textOverflow: "ellipsis",
        color: "#ffffff",
        fontWeight: "bold" 
    },
    loading: { margin: "0 0.5rem" }
}

// create Polling app
//--------------------------------------------------------
class UserView extends Component {

    state = {
        selected: false,
        loading: false,
        width: 250,
        height: 250,
        point: 0
    }
    
    componentDidMount(){

    }

    handleClick = ev => {
        let id = ev.currentTarget.getAttribute("id");
        id = parseInt(id, 10);
        this.setState({selected: true},
            () => this.props.updateData(id)
        )  
    }

    toggleLoader = () => this.setState({ loading: !this.state.loading });

    // render DOM
    render(){
        
        const { width, height, cPoll } = this.props;

        return(
            
            cPoll && cPoll.options.active ?
             
                <div>               
                    <Graph cPoll={cPoll} width={width} height={height}/>
                    <Panel as="h5" color="green" header="Online">
                        <div style={style.choices}>
                            {cPoll.data.map(choice => 
                                <Button 
                                fluid={window.screen.width < 768 ? true : false}
                                name={choice.x}
                                id={choice.id}
                                onClick={this.handleClick}
                                disabled={this.state.selected}
                                style={{ ...style.choice, background: choice.color }} 
                                content={choice.x}/>
                            )}
                        </div>
                    </Panel>
                </div>
            : 
                <div>
                    <Header as="h1">
                            Waiting for admin to activate poll
                            <Icon style={style.loading} name="spinner" loading/>
                    </Header>
                </div>
        )
    }
}

export default UserView;

