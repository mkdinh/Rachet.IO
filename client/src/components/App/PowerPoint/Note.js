import React from "react";
import { TextArea , Button } from "semantic-ui-react";

const style = {
    textarea: { width: "100%", fontSize: "1rem", height: "78vh" }
}

export default (props) => {

    const handleClick = () => {
        props.updatePowerPoint();
        alert("Successfully saved note")
    }

    return (
        <div>
            <TextArea 
            name="note"
            style={style.textarea}
            onChange={props.addNote} 
            value={props.note}/>
            <Button fluid 
            color="green"
            content="Save Notes"
            onClick={handleClick}/>
        </div>
)
}
