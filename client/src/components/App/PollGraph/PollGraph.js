// Import React
//--------------------------------------------------------
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import AdminView from "./AdminView";
import UserView from "./UserView";
import Socket from "./PollSocket";
import actions from "../../../utils/actions";

// create Polling app
//--------------------------------------------------------
class PollGraphApp extends Component {

    state = {
        selected: false,
        loading: false,
        width: 250,
        height: 250,
        admin: false
    }
    
    componentDidMount(){
        window.screen.width < 768 ? 
            window.addEventListener("resize", this.handleResize) 
        : this.handleResize();

        this.props.dispatch(actions.Poll.findActive())
        .then(db => null );
    };


    componentWillUnmount() {
        window.screen.width < 768 ? 
            window.removeEventListener("resize", this.handleResize) 
        : this.handleResize();
    };
    
    handleResize = () => {
        const dom = ReactDOM.findDOMNode(this).getClientRects()[0];
        const width = dom.width;

        this.setState({ width: width })
    };

    updateData = id => {
        let nPoll = { ...this.props.cPoll };
        let nData = nPoll.data;
        let allIDs = nData.map(el => el.id);  
        let index = allIDs.indexOf(id);
        let nValue = nData[index].value + 1;
        nData[index] = {...nData[index], y: nValue, value: nValue };
        this.updatePoll(nPoll);
    }

    updatePoll = (poll) => {
        this.props.dispatch(actions.Poll.updateOne(poll))
        .then(db => this.props.emitUpdate(poll._id))
        .catch(err => console.log(err));
    };

    toggleLoader = () => this.setState({ loading: !this.state.loading });

    toggleView = () => this.setState({admin: !this.state.admin});

    // render DOM
    render(){

        const width = this.state.width;
        const height = this.state.height;
        const cPoll = this.props.cPoll;
        const adminView = this.props.adminView;

        return (
            adminView ? 
                <AdminView 
                width={width} 
                height={height}
                emitUpdate={this.props.emitUpdate}/>
            :
                <UserView 
                cPoll={cPoll} 
                width={width} 
                height={height}
                updateData={this.updateData}/>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        privilege: state.user.privilege,
        adminView: state.user.adminView,
        cPoll: state.poll.cPoll,
    })
}

PollGraphApp = Socket(PollGraphApp);
PollGraphApp = connect(mapStateToProps)(PollGraphApp);

export default PollGraphApp;

