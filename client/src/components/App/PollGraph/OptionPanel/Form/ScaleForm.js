import React from "react";
import { Form, Button, Header } from "semantic-ui-react";

const style = {
    header: { margin: "0 0 0.25rem 0" },            
    field: { width: "100%", padding: "0 0.3rem 0 0" },
    input: { width: "100%" }    
}

export default (props) => 
    <div>
        {console.log(props.options.scale[props.name])}
        <Header style={style.header} content={props.header}/>
        <Form.Group inline>
            <Button
            icon="minus"
            value={-0.05}
            name={props.name}
            onClick={props.handleScaleChange}/>
            <Form.Field style={style.field}>
                <input readOnly
                name={props.name}
                style={style.input}
                value={props.options.scale[props.name] ? props.options.scale[props.name].toFixed(2) : 0}/>
            </Form.Field>
            <Button
            icon="plus"
            value={+0.05}
            name={props.name}
            onClick={props.handleScaleChange}/>
        </Form.Group>
    </div>