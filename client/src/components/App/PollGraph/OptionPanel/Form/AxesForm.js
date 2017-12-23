import React from "react";
import { Form, Checkbox, Header } from "semantic-ui-react";

const style = {
    checkbox: { margin: "0 1rem 1rem 2rem", fontWeight: "bold" },
    header: { margin: "0 0 0.25rem 0" }        
}

export default (props) => 
    <div>
        <Header style={style.header} content="Axes"/>
            <Form.Group>
                <Checkbox toggle
                disabled={props.disabled}
                style={style.checkbox}
                type="checkbox"
                name="axes"
                checked={props.options.axes}
                onChange={() => props.handleToggle("axes")}
                label="Hide"/>
                    
                {props.options.axes ?
                    <Checkbox toggle
                    disabled={props.disabled}
                    style={style.checkbox}
                    type="checkbox"
                    name="grid"
                    checked={props.options.grid}
                    onChange={() => props.handleToggle("grid")}
                    label="Grid"/> : null}
            </Form.Group>
  
        {props.options.axes ?
            <div> 
                <Form.Input
                disabled={props.disabled}
                label="X Axis Label"
                name="x"
                value={props.options.axisLabels.x}
                onChange={props.handleLabelChange}/>

                <Form.Input
                disabled={props.disabled}
                label="Y Axis Label"
                name="y"
                value={props.options.axisLabels.y}
                onChange={props.handleLabelChange}/>
            </div>
        : null}
    </div>