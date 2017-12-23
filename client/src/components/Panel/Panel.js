import React from "react";
import { Segment } from "semantic-ui-react";
import Header from "./PanelHeader";
import "./Panel.css"

const Panel = (props) => {
    
    const style = {
        padding: props.fluid ? 0 : "1rem",
        width: props.width
    }

    return (
        <Segment loading={props.loading} style={{style, ...props.style}} >
            <Header fluid={props.fluid} 
            rightItem={props.rightItem} 
            color={props.color} 
            as={props.as} 
            content={props.header}/>
                {props.children}
        </Segment>
    )
}

export default Panel;