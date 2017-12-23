import React, { Component } from "react";
import Panel from "../../../Panel"
import { BarOptions, PieOptions } from "./Form";
import { Button, Checkbox } from "semantic-ui-react";

const style = {
    wrapper: { margin: "0 1rem 1rem", width: "20vw" },
    options: { margin: "1rem 0 0 0"}
}

class OptionPanel extends Component {
    state = {
        axisLabels: { x: "", y: "" },
        scale: { width: 1, height: 1, radius: 1 }, 
        axes: false, 
        grid: false,
        active: false
    }

    componentDidMount() {
        this.setState({ ...this.props.cPoll.options });
    }

    handleScaleChange = ev => {
        // create new scale object and save it to state of adminview
        let name = ev.currentTarget.getAttribute("name");
        let value = ev.currentTarget.getAttribute("value");
        const scale = {...this.state.scale};
        scale[name] += parseFloat(value);
        if(scale.height < 1.10 && scale.width < 1.25){
            this.setState({ scale: scale }, this.handleUpdate);
        };
    }

    handleLabelChange = ev => {
        const { name, value } = ev.target;
        let axisLabels = this.state.axisLabels;
        axisLabels[name] = value;
        this.setState({axisLabels: axisLabels }, this.handleUpdate);
    }

    handleToggle = name => { 
        this.setState({ [name]: !this.state[name] }, this.handleUpdate);
    }


    handleUpdate = () => this.props.updateOptions(this.state);

    render() {

        const cPoll = this.props.cPoll;
        const type = cPoll.type || "";
        const options = this.state || cPoll.options;
        const viewport = window.screen;

        return (
            <div style={style.wrapper}>
                <Panel width={viewport.width > 768 ? "40vh" : "100%"} 
                as="h3" 
                color="red" 
                header="Options">
                    <div style={style.options}>
                        <Checkbox toggle
                        style={style.checkbox}
                        type="checkbox"
                        name="active"
                        checked={options.active}
                        onChange={() => this.handleToggle("active")}
                        label="Going Live"/>

                        {type === "bar" ?
                            <BarOptions
                            disabled={options.active}
                            handleToggle={this.handleToggle}
                            handleScaleChange={this.handleScaleChange} 
                            handleLabelChange={this.handleLabelChange}                         
                            handleNumericChange={this.handleNumericChange} 
                            options={options}/>
                        : 
                        type === "pie" ?
                            <PieOptions
                            handleScaleChange={this.handleScaleChange} 
                            handleNumericChange={this.handleNumericChange}                         
                            options={options}/>
                        :
                            null// <ScatterOptions/>
                        }
                    </div>

                    <Button fluid color="green" onClick={this.props.renderPoll}>
                        Save Graph Configs
                    </Button>
                </Panel>
                
            </div>
        )
    }
}

export default OptionPanel;