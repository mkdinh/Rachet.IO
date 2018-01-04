// Import React
//--------------------------------------------------------
import React, { Component } from "react";
import DisplayMessages from "./DisplayMessages";
import DisplayRooms from "./DisplayRooms";
import LoaderHOC from "../../Loader";

const style = {
    wrapper: { height: "45vh", overflow: "scroll", padding: "0.5rem 1rem" },
    poster: { fontWeight: "bold" }
};

class MessageBox extends Component {

    state = {
    
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div style={style.wrapper}>
                {this.props.cRoom ?
                    <DisplayMessages cRoom={this.props.cRoom}/>
                    :
                    <DisplayRooms 
                    admin={this.props.admin}
                    users={this.props.users}
                    load={this.props.load}
                    selectRoom={this.props.selectRoom} 
                    createRoom={this.props.createRoom}
                    deleteRoom={this.props.deleteRoom}
                    roomList={this.props.roomList}/>}
            </div>
        )
    }
}

MessageBox = LoaderHOC(MessageBox)

export default MessageBox;