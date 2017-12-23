import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

const style = {
    wrapper: { marginLeft: 0, marginRight: 0 },
    input: { width: "90%", margin: "0.75rem" },
    error: { borderRadius: 0 },
    form: { 
        textAlign: "center", 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center",
        margin: "0 1rem"
    },
}

class InputForm extends Component {
    state = {
        message: "",
        created_by: false,
        roomId: false,
        loading: false

    }

    toggleLoading = () => this.setState({loading: !this.state.loading})

    componentDidMount() {
        if(!this.state.created_by || !this.state.roomId) {
            this.setState({created_by: this.props.name, roomId: this.props.cRoom._id});
        };
    }

    handleChange = ev => {
        const { value, name } = ev.target;
        this.setState({[name]: value})
    }

    handleSubmit = ev => {
        this.toggleLoading();
        const message = this.state.message;
        ev.preventDefault();
        if(message.length > 0){
            this.props.createPost(this.state)
            .then(doc => {
                this.setState({message: ""}, this.toggleLoading);
            })
        }else{
            this.setState({error: "Error: post is empty"});
        }
    }

    render() {

        const message = this.state.message;
        const loading = this.state.loading;
        
        return (
            
            <Form style={style.form}>
                <Form.Field 
                style={style.input}>
                    <input  
                    name="message"
                    value={message}
                    onChange={this.handleChange}/>
                </Form.Field>
                <Button loading={loading} style={style.button} content="Submit" onClick={this.handleSubmit}/>
            </Form>
        )
    }
}

export default InputForm;