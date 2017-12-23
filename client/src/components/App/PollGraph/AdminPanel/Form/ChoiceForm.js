import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

const style = {
    input: { margin: "0.5rem 0 0 0" }
}

class ChoiceForm extends Component {
    state = { 
        x: 0, 
        y: 0,
        color: "#000000", 
        key: "", 
        value: 0 
    }

    handleChange =  (ev) => {
        let { name, value } = ev.target;
        this.setState({[name]: value});
    }

    handleSubmit = (ev) => {
        let { key, color } = this.state;

        let newChoice = {
            x: key, 
            y: 0, 
            color: color, 
            key: key, 
            id: Math.floor(Math.random() * 10000), 
            value: 0
        };

        this.props.handleAddChoice(newChoice);
      
        this.setState({
            x: "",
            y: 0, 
            color: "#000000", 
            key: "", 
            id: 0,
            value: 0
        });
    }

    render() {

        const key = this.state.key;

        return (
            <Form>
                <Form.Input 
                style={style.input}
                onChange={this.handleChange}
                name="key" value={key} 
                placeholder="Add new option"/>
                    <Button fluid 
                    onClick={this.handleSubmit}
                    color={key.length > 0 ? "green" : null}>
                        Add New
                    </Button>
            </Form>
        )
    }
};

export { ChoiceForm };