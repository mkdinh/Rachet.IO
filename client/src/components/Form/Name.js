import React, { Component } from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

const style = {
    form: { textAlign: "center" },
    input: { margin: "1rem", width: "75%" },
    error: { borderRadius: 0 }
}

class NameForm extends Component {
    state = {
        name: "",
        error: ""
    }

    handleChange = ev => {
        console.log(this.props)
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
                <Form.Group inline>
                    <Form.Field 
                    style={style.input}
                    control="input"
                    name="name"
                    value={name} 
                    onChange={this.handleChange}/>
                    <Button compact content="Submit" onClick={this.handleSubmit}/>
                </Form.Group>
            </Form>
        )
    }
}

export default NameForm;