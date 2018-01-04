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
        this.props.dispatch(actions.PowerPoint.createOne(this.state))
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

                <Button fluid
                loading={this.state.loading}
                content={this.state.title.length > 5 ? "Submit" : "Create a new presentation"}
                color={this.state.title.length > 5 ? "green" : null} 
                onClick={this.handleSubmit}/>
            </Form>
        )
    }
}

const mapStateTopProps = (state) => {
    return ({});
}

export default connect(mapStateTopProps)(PollForm);