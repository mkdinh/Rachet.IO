import React from "react";
import io from "socket.io-client";
// import socketListener from "./SocketEvents";
import actions from "../../../utils/actions";
import { connect } from "react-redux";

export default (Component) => {

    const mapStateToProps = (state) => {
        return ({
            cPoll: state.poll.cPoll
        })
    }

    class PollSocket extends Component {

        socket = io("/poll");

        componentDidMount() {
            this.socket.on("update-poll", data => {
                this.props.dispatch(actions.Poll.findOne(data.id))
                .then(data => {
                        
                })
            });
        };

        componentWillUnmount() {
            this.socket.disconnect();
        }
           
        emitUpdate = (id) => this.socket.emit("update-poll", { id: id });

        render() {
            return (
                <Component 
                emitUpdate={this.emitUpdate}
                {...this.props}/>
            )
        };
    }
    
    return connect(mapStateToProps)(PollSocket);
}