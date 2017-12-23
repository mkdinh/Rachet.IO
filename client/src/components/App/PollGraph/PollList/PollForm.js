import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import actions from "../../../../utils/actions";

class PollForm extends Component {
    state = {
        title: "",
        type: "",
        loading: false
    }

    toggleLoading = () => this.setState( {loading: !this.state.loading} );

    handleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    }

    handleCheckbox = (ev, select) => {
        const { name, value } = select;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        this.toggleLoading();
        this.props.dispatch(actions.Poll.createOne(this.state))
        .then(db => this.setState({title: "", type: "", loading: false}))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Form>
                <Form.Input 
                name="title" 
                value={this.state.title} 
                onChange={this.handleChange}/>
                
                <Form.Group>          
                    <Form.Checkbox
                    radio
                    label='Bar'
                    name='type'
                    value='bar'
                    checked={this.state.type === 'bar'}
                    onChange={this.handleCheckbox}/>  
                    <Form.Checkbox
                    radio
                    label='Pie'
                    name='type'
                    value='pie'
                    checked={this.state.type === 'pie'}
                    onChange={this.handleCheckbox}/>
                    <Form.Checkbox
                    radio
                    label='Scatter'
                    name='type'
                    value='scatter'
                    checked={this.state.type === 'scatter'}
                    onChange={this.handleCheckbox}/>                   
                </Form.Group>

                <Button fluid
                loading={this.state.loading}
                content={this.state.title.length > 10 ? "Submit" : "Create a new poll"}
                color={this.state.title.length > 10 ? "green" : null} 
                onClick={this.handleSubmit}/>
            </Form>
        )
    }
}

const mapStateTopProps = (state) => {
    return ({});
}

export default connect(mapStateTopProps)(PollForm);