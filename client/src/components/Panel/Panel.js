import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import Header from "./PanelHeader";
import CSSModules from "react-css-modules";
import styles from "./Panel.css"

const Panel = (props) => {
    
    const style = {
        padding: props.fluid ? 0 : "1rem"
    }
    console
    return (
        <Segment loading={props.loading} style={style} >
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