import React from "react";

export default (props) => {

    const handleClick = (ev) => {
        ev.preventDefault();
        props.toggleLoader();
        props.selectLobby(props.toggleLoader);
    }

    return (
        <a href="#" onClick={handleClick}>Return to lobby</a> : null
    )
}
