import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import "./Presentation.css";

const style = {
    image: { width: "100vw", height: "100vh", 
            position: "absolute", top: 0, left: 0, zIndex: 999 
        }
}

export default class Presentation extends Component {

    render() {
        return (
                <Image style={style.image} src={this.props.slide.dataURL} alt={this.props.slide.name}/>
        )
    }
}