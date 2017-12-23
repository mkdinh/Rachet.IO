import React from "react";
import { Button } from "semantic-ui-react";

export default (props) => {

    const handleClick = (ev) => {
        ev.preventDefault();
        props.toggleLoader();
        props.selectLobby(props.toggleLoader);
    }

    return (
        <Button basic onClick={handleClick}>Return to lobby</Button>
    )
}
