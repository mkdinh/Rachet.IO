import React, { Component } from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

const style = {
    input: { width: "90%", margin: "1rem", flexGrow: 1 },
    error: { borderRadius: 0 },
    form: { 
        textAlign: "center", 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center",
        margin: "0 1rem",
        flexGrow: 1 
    }
}

class NameForm extends Component {
    state = {
        name: "",
        error: ""
    }

    handleChange = ev => {
        const { value, name } = ev.target;
        this.setState({[name]: value})
    }

    handleSubmit = ev => {
        const name = this.state.name;
        ev.preventDefault();
        if(name.length > 0){
            this.props.createRoom(this.state);
            this.setState({name: "", error: ""})
        }else{
            this.setState({error: "Error: name is empty"});
        }
    }

    render() {

        const name = this.state.name;
        const error = this.state.error;

        return (
            <Form style={style.form}>
                {error ? <Segment inverted style={style.error} color="red" content={error}/> : null}
                <Form.Field 
                style={style.input}>
                    <input  
                    name="name"
                    value={name}
                    placeholder="Room name"
                    onChange={this.handleChange}/>
                </Form.Field>
                <Button compact content="Submit" 
                onClick={this.handleSubmit}
                color={name.length > 0 ? "green" : null} />
            </Form>
        )
    }
}

export default NameForm;