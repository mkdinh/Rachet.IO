import React from "react";
import { Header, Form } from "semantic-ui-react";

const style = {
    wrapper: { margin: "1rem 0 0 0" },
    header: { margin: "0 0 0.25rem 0" }
}

export const TitleForm = (props) =>
    <Form style={style.wrapper}>
        <Header style={style.header} content="Title"/>
        <Form.Input 
        disabled={props.disabled}
        name="title"
        onChange={props.handleChange} 
        value={props.title}/>
    </Form>