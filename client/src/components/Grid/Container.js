import React from "react";
import "./Container.css";

export const Container = (props) =>
    <div className={`${props.inline ? "container inline" : "container"} ${props.direction ? 
        props.direction === "column" ? "column" : 
        props.direction === "reverse-column" ? "reverse-column" : 
        props.direction === "reverse-row" ? "reverse-row" : "row" 
    :
    "row"} ${props.wrap ? 
        props.wrap === "wrap" ? "wrap" :
        props.wrap === "reverse-wrap" ? "reverse-wrap" : "nowrap"
    :
    "nowrap"} ${props.justify ?
        props.justify === "center" ? "justify-center" :
        props.justify === "stretch" ? "justify-stretch" :
        props.justify === "space-between" ? "justify-space-between" :
        props.justify === "space-around" ? "justify-space-around" :
        props.justify === "space-evenly" ? "justify-space-evenly" :
        props.justify === "flex-end" ? "justify-flex-end" : "justify-flex-start"
    :
    "justify-flex-start" 
    } ${props.align ?
        props.align === "center" ? "align-center" :
        props.align === "stretch" ? "align-stretch" :
        props.align === "baseline" ? "align-baseline" :
        props.align === "flex-end" ? "align-flex-end" : "align-flex-start"
    :
    "align-flex-start" 
    }`}>

        {props.children}

    </div>