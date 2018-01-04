// Import React
//--------------------------------------------------------
import React, { Component } from "react";
import Graph from "./Graph";
import { connect } from "react-redux";
import AdminPanel from "./AdminPanel";
import OptionPanel from "./OptionPanel";
import PollList from "./PollList";
import actions from "../../../utils/actions";

const style = {
    wrapper: { 
        display: "flex", 
        flexDirection: window.screen.width > 768 ? "row" : "column", 
        justifyContent: "center" 
    },
    divider: { margin: 0 },
    notification: { textAlign: "center" },
    choices: { 
        display: "flex", 
        justifyContent: "center", 
        itemsAlign: "center", 
        flexWrap: "wrap" 
    },
    choice: { 
        minWidth: window.screen.width > 768 ? "25%" : "100%", 
        margin: "0.25rem", 
        overflow: "hidden", 
        textOverflow: "ellipsis",
        color: "#ffffff",
        fontWeight: "bold" 
    }
}

// create Polling app
//--------------------------------------------------------
class AdminView extends Component {
    state = {
        title: "",
        type: "",
        data: [],
        options: {
            axisLabels: { x: "", y: "" },
            scale: { width: 1, height: 1, radius: 1 }, 
            axes: false, grid: false
        },
        loading: false,
        _id: null
    }

    componentDidMount() {
        this.props.dispatch(actions.Poll.findAll())
            .then(db => this.setState({ ...this.props.cPoll })); // turn off loading
    };

    componentWillReceiveProps(props) {
        // spread out current poll to be configured
        if(!this.state._id){
            this.setState({ ...props.cPoll });
        };
        // update cPoll data as user submit their input
        if(props.cPoll){
            this.setState({ data: props.cPoll.data })
        };
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     if(this.state._id){
    //         return false;
    //     }else{
    //         return true;
    //     }
    // }

    updateOptions = options => this.setState({ options: options })

    updateChoices = choices => this.setState({ data : choices });

    renderPoll = (cb) => {
        this.toggleLoading();
        this.props.dispatch(actions.Poll.updateOne(this.state))
        .then(db => { 
            this.props.emitUpdate(this.state._id);
            this.toggleLoading();
        }) //loading here
        .catch(err => console.log(err));
    }
    

    handleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    }

    handleSelection = (ev, select) => {
        const { name, value } = select;
        this.setState({ [name]: value });
    }

    handleReturn = () => {
        this.props.dispatch(actions.Poll.removeCPoll())
        this.setState({
            _id: false,
            title: "",
            type: "",
            data: [],
            options: {
                axisLabels: { x: "", y: "" },
                scale: { width: 1, height: 1, radius: 1, innerRadius: 0 }, 
                axes: false, grid: false
            },
            loading: false
        })
    }

    toggleLoading = () => this.setState({ loading: !this.state.loading });

    // render DOM
    render(){

        const cState = this.state;
        const list = this.props.list;

        return(
            <div style={style.wrapper}>
                {cState._id ?
                    <OptionPanel 
                    cPoll={cState}   
                    savePoll={this.savePoll}
                    renderPoll={this.renderPoll}
                    toggleActive={this.toggleActive}
                    updateOptions={this.updateOptions}/> : null}

                {this.props.cPoll ? 
                    <Graph
                    admin
                    toggleLoading={this.toggleLoading}
                    handleReturn={this.handleReturn}
                    active={this.props.cPoll.options.active}
                    loading={this.state.loading} 
                    cPoll={cState} 
                    width={this.props.width} 
                    height={this.props.height}/>
                :
                    <PollList list={list}/>}
        
                
                {cState._id ? 
                    <AdminPanel 
                    cPoll={cState}
                    handleChange={this.handleChange}
                    handleSelection={this.handleSelection}
                    updateChoices={this.updateChoices}
                    updateOptions={this.updateOptions}/> : null}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return ({
        list: state.poll.list,
        cPoll: state.poll.cPoll
    })
}

export default connect(mapStateToProps)(AdminView);

