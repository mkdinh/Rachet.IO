import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import actions from "../../utils/actions";

const style = {
    error: { color: "red", textAlign: "center" }
}

class LoginForm extends Component {
    state = {
        email: "mkdinh94@gmail.com",
        password: "123456",
        error: "",
        passed: false,
        loading: false
    }

    handleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({[name]: value}, this.handlePass);
    }

    handlePass = () => {
        this.state.email.length > 0 && this.state.password.length > 0 ? 
            this.setState({passed: true})
        :
            this.setState({passed: false})
    }

    handleLogin = () => {
        let user = {
          username: this.state.email,
          password: this.state.password
        }

        this.toggleLoad()

        this.props.dispatch(actions.User.login(user))
        .then(user => this.toggleLoad())
        .catch(err => this.setState({error: err}))
    }

    toggleLoad = () => this.setState({loading: !this.state.loading})

    render(){

        const email = this.state.email;
        const password = this.state.password;
        const loading = this.state.loading;

        return(
            <Form>
                <div style={style.error}>{this.state.error}</div>
                <Form.Input 
                name="email"
                value={email} 
                onChange={this.handleChange} 
                label="Email" 
                placeholder="email"/>

                <Form.Input 
                type="password"
                name="password" 
                value={password}
                onChange={this.handleChange} 
                label="Password" 
                placeholder="password"/>
                
                <Button fluid 
                loading={loading}
                color={this.state.passed ? "green" : null}
                onClick={this.handleLogin}
                content="Submit"/>
            </Form>
        )
    }
};

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })    
}

export default connect(mapStateToProps)(LoginForm);