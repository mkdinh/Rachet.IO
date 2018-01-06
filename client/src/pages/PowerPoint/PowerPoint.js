// Import dependencies
//--------------------------------------------------------
import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import List from "../../components/App/PowerPoint/PowerPointList";
import "./PowerPoint.css";
import actions from "../../utils/actions";

const style = {
    wrapper: {
        display: "flex",
        justifyContent: "center"
    }
};

// Create stateful home page component
//--------------------------------------------------------
class PowerPoint extends Component {
    // initial state
    state = {}

    componentDidMount() {
        // request all current presentation
        this.props.dispatch(actions.PowerPoint.findAll())
        .then(db => null)
        .catch(err => console.log(err));
    }

    // render DOM
    render(){
        const list = this.props.list || [];

        return(
            <Container style={style.wrapper}>
                {this.props.admin ? 
                    <List list={list}/> 
                : 
                this.props.login ? 
                <h1> Change to Admin View to edit PowerPoint </h1>
                :
                <h1> Login to access PowerPoint </h1>}
            </Container>
        )
    }
};

const mapStateToProps = (state) => {
    return ({
        list: state.powerpoint.list,
        login: state.user.login,
        admin: state.user.adminView
    })
}

export default connect(mapStateToProps)(PowerPoint);