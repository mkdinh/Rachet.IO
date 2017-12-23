import React, { Component } from "react";
import { List, Popup, Icon } from "semantic-ui-react";
import { GithubPicker } from "react-color";

const style = {
    item: { 
        boxShadow: "0 0 1px #9a9a9a", 
        padding: "0.25rem 0.5rem", 
        margin: "0.25 0.25rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "flex"
    },
    edit: { float: "left" },
    delete: { float: "right" },
    content: { flexGrow: 2, padding: "0.075rem" },
    input: { width: "100%", fontSize: "1rem", flexGrow: 0, padding: "0.1rem" }
}

class ChoiceItem extends Component {
    state = {
        edit: false,
        name: "",
        color: "",
        confirm: false,
        id: null
    }

    toggleEdit = () => {   
        this.setState({
            edit: !this.state.edit,
            key: this.props.item.key,
            color: this.props.item.color,
            id: this.props.item.id
        })
    };

    handleDelete = (ev) => {
        if(!this.state.confirm){
            this.setState({ confirm: true });
        }else{
            let id = ev.currentTarget.getAttribute("data-id");
            this.setState({ confirm: false });
            this.props.handleRemoveChoice(id);         
        }
    }

    handleChange =  (ev) => {
        let { name, value } = ev.target;
        this.setState({[name]: value});
    }

    handleColorChange = (ev) => {
        const hex = ev.hex;
        this.setState({ color: hex })
    }

    handleSubmit = () => {
        const { id, key, color } = this.state;
        this.props.handleUpdateChoice(id, key, color);
        this.toggleEdit();
    }

    render() {
        const edit = this.state.edit;
        const item = this.props.item;
        const localKey = this.state.key;
        
        return (
              
            <List.Item style={{...style.item, color: item.color}} as="li">
                <Popup
                content={<GithubPicker name="color" onChange={this.handleColorChange}/>}
                on="click"
                trigger={<Icon 
                        onClick={edit ? this.handleSubmit : this.toggleEdit} 
                        style={style.edit} 
                        color="blue" 
                        name={edit ? "check" : "edit"}/>}
                />
                {edit ? 
                    <input style={style.input} 
                    name="key" 
                    value={localKey} 
                    onChange={this.handleChange}/>
                :
                    <span style={style.content}>{item.key}</span>}

                <Popup inverted
                position="right center"
                on="click"
                header="Are you sure ?"
                onClose = {() => this.setState({ confirm: false })}
                trigger= {<Icon 
                            data-name={item.key}
                            disabled={this.props.disabled}
                            color="red"
                            data-id={item.id} 
                            style={style.delete}
                            onClick={this.props.disable ? null : this.handleDelete} 
                            name={this.state.confirm ? "check" : "delete"}/>}
                />
                
            </List.Item>
        )
    }
}

export default ChoiceItem;