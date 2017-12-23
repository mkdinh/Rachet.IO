import React, { Component } from "react";
import Panel from "../../../Panel"

import { TitleForm, 
    ChoiceForm, 
    GraphTypesDropdown, 
    ChoiceList } from "./Form";

const style = {
    wrapper: { margin: "0 1rem 1rem", width: window.screen.width > 768 ? "20vw": null },
}

class AdminPanel extends Component {
    state= {
        title: "",
        type: "",
        data: [],
        options: {
            axisLabels: { x: "", y: "" },
            scale: { width: 1, height: 1, radius: 1, innerRadius: 0 }, 
            axes: false, grid: false
        }
    }
    
    handleUpdate = () => this.props.updateOptions(this.state);

    handleRemoveChoice = (id) => {
        // filter out choices with matching id
        id = parseInt(id, 10)
        let choices = [ ...this.props.cPoll.data ];
        choices = choices.filter(el => el.id !== id);
        this.props.updateChoices(choices)
    }

    handleUpdateChoice = (id, value, color) => {
        let choices = [ ...this.props.cPoll.data ];
        // return array of ids and find the matching id
        let index = choices.map(el => el.id).indexOf(id);
        // update choices data
        choices[index].key = value;
        choices[index].color = color;
        choices[index].x = value;        
        this.props.updateChoices(choices);
    }

    handleAddChoice = (choice) => {
        // spread new array, push new choice, and update array
        let choices = [ ...this.props.cPoll.data ];
        choices.push(choice);
        this.props.updateChoices(choices);
    }

    render() {

        const cPoll = this.props.cPoll || this.state;
        const viewport = window.screen;

        return (
            <div style={style.wrapper}>
                <Panel width={viewport.width > 768 ? "40vh" : "100%"} 
                as="h3" 
                color="red" 
                header="Admin">
                    <TitleForm 
                    disabled={cPoll.options.active}
                    title={cPoll.title}
                    handleChange={this.props.handleChange}/>
                    <GraphTypesDropdown 
                    disabled={cPoll.options.active}
                    handleSelection={this.props.handleSelection} 
                    cType={cPoll.type}/>
                    <ChoiceList
                    disabled={cPoll.options.active}
                    handleRemoveChoice={this.handleRemoveChoice} 
                    handleUpdateChoice={this.handleUpdateChoice}
                    data={cPoll.data}/>
                    <ChoiceForm
                    disabled={cPoll.options.active}
                    handleAddChoice={this.handleAddChoice}/>
                </Panel>
            </div>
        )
    }
}

export default AdminPanel;