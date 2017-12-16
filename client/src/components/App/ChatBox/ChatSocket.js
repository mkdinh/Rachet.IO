import React, { Component } from "react";
import io from "socket.io-client";
import socketListener from "./ChatEvents";
import actions from "../../../utils/actions";
import { connect } from "react-redux";

export default (Component) => {

    const mapStateToProps = (state) => {
        return ({
            cRoom: state.room.cRoom
        })
    }

    class ChatSocket extends Component {
        constructor(props){
            super(props)            
            this.state = {
                cUser: {},
                users: [],
                rooms: [],
                messages: []
            };
        }
        
        socket = io("/chat");

        componentDidMount() {
            socketListener(this.socket, this);
        }
           
        connectToLobby = (name) => this.socket.emit("connect to lobby", name);
        
        connectToRoom = (room) => this.socket.emit("connect to room", room)
        
        postMessage = (post) => this.socket.emit("new post", post)

        updateRoom = () => 
            new Promise((resolve, reject) => {
                this.props.dispatch(actions.Room.findOne(this.props.cRoom._id))
                .then(doc => resolve(doc))
                .catch(err => console.log(err))
            });

        render() {
            return (
                <Component 
                connectToLobby={this.connectToLobby}
                connectToRoom={this.connectToRoom}
                postMessage={this.postMessage}
                updateRoom={this.updateRoom}
                users={this.state.users}
                cUser={this.state.cUser}
                rooms={this.state.rooms}
                messages={this.state.messages}
                {...this.props}/>
            )
        };
    }
    
    return connect(mapStateToProps)(ChatSocket);
}