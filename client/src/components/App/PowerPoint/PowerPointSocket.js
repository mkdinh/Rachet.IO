import React from "react";
import io from "socket.io-client";
import socketListener from "./SocketEvents";
import actions from "../../../utils/actions";
import { connect } from "react-redux";

export default (Component) => {

    const mapStateToProps = (state) => {
        return ({
            privilege: state.user.privilege
        })
    };

    class PowerPointSocket extends Component {

        state = {
            cSlide: null,
            modal: false
        }

        socket = io("/powerpoint");

        componentDidMount() {
            this.socket.on("update-current-slide", data => {
                this.setState({ cSlide: data.itemId });
            });

            this.socket.on("toggle-modal", () => {
                this.setState({ modal: !this.state.modal });
            });
        };

        componentWillUnmount() {
            this.socket.disconnect();
        };

        emitCSlide = (itemId, cb) => {
            this.setState({ cSlide: itemId }, cb);
            this.socket.emit("update-current-slide", { itemId: itemId })
        };

        emitModal = () => this.socket.emit("toggle-modal")

        render() {
            return (
                <Component
                cSlide={this.state.cSlide}
                modal={this.state.modal} 
                emitCSlide={this.emitCSlide}
                emitModal={this.emitModal}
                {...this.props}/>
            )
        };
    };
    
    return connect(mapStateToProps)(PowerPointSocket);
};