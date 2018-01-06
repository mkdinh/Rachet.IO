import React from "react";
import { Image } from "semantic-ui-react";

const style = {
    wrapper: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}
export default (props) => 
    <div style={style.wrapper}>
        <Image src={props.slide.dataURL} alt={props.slide.name}/>
    </div>
