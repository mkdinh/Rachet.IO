import React from "react";
import { Header, Form, Dropdown } from "semantic-ui-react";

const style = {
    wrapper: { margin: "1rem 0 0.5rem" },
    header: { margin: "0 0 0.5rem 0" }    
}

const allTypes = [
    { text: "Bar", value: "bar" },
    { text: "Pie", value: "pie" },
    { text: "Scatter", value: "scatter"}
]

export const GraphTypesDropdown = (props) =>
    <Form style={style.wrapper}>
        <Header style={style.header} content="Type"/>
        <Dropdown fluid selection
        disabled={props.disabled}
        header="Types"
        name="type"
        onChange={props.handleSelection}
        value={props.cType} 
        options={allTypes}/>
    </Form>