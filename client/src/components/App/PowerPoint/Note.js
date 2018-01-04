import React, { Component } from "react";
import { TextArea , Button } from "semantic-ui-react";

const style = {
    textarea: { width: "100%", fontSize: "1rem", height: "78vh" }
}

export default (props) => 
    <div>
        <TextArea 
        name="note"
        style={style.textarea}
        onChange={props.addNote} 
        value={props.note}/>
        <Button fluid 
        color="green"
        content="Save Notes"
        onClick={props.updatePowerPoint}/>
    </div>
