import React, { Component } from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

const style = {
    form: { textAlign: "center" },
    input: { flexGrow: 1 },
    field: { margin: "0 1rem", flexGrow: 1 },
    button: { margin: "1rem" },
    error: { borderRadius: 0 },
    group: { display: "flex", justifyContent: "center", alignItems: "center" }
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
            this.props.onSubmit(this.state.name)
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
                <div style={style.group}>
                    <Form.Field style={style.field}>
                        <input 
                        style={style.input}
                        name="name"
                        value={name} 
                        onChange={this.handleChange}/>
                    </Form.Field>
                    <Button compact 
                    style={style.button}
                    content="Submit" 
                    onClick={this.handleSubmit}/>
                </div>
            </Form>
        )
    }
}

export default NameForm;