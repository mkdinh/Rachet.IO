import React from "react";
import { Header } from "semantic-ui-react";
import styles from "./Panel.css"

const PanelHeader = (props) => {

    const style = {
        header: { margin: props.fluid ? "1rem" : 0 },
        right: {float: "right"}
    }

    return (

        <Header 
        style={style.header}
        color={props.color}
        as={props.as || "h1"}>
            {props.content}
            <span style={style.right}>{props.rightItem}</span>
        </Header>
    )
}

export default PanelHeader;