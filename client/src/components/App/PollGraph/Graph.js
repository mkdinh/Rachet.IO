import React from "react";
import { Button } from "semantic-ui-react";
import { BarChart, PieChart, LineChart, AreaChart, Legend } from "react-easy-chart";
import Panel from "../../Panel"

export default (props) => {
    const style = {
        wrapper: { textAlign: "center" },
        panel: { margin:"0 0 1rem 0" },
        graph: { display: "flex", justifyContent: "center", itemsAlign: "center" },
        bar: { textAlign: "center" },
        pie: { 
            margin: "0.5rem 0", 
            ".pie-chart-label": { fill: "#ffffff" }
        }
    }

    const displayGraph = ({ type, data, options }) => {
        let {grid, axes, scale, axisLabels } = options;

        let viewport = window.screen;
        switch(type) {
            case "bar":
                return <BarChart
                        colorBars 
                        fluid
                        width={props.fluid ? null : viewport.width > 768 ? props.width * 0.5 * scale.width : props.width * 0.9}
                        height={viewport.width > 768 || props.admin ? props.height * scale.height * 2
                            : props.height * scale.height}
                        style={{ ...style.graph, ...style.bar }}
                        axes={axes}
                        grid={grid}
                        data={data}
                        axisLabels={axisLabels}/>
            case "pie":
                return <PieChart labels
                    size={viewport.width > 768 ?  props.width * scale.radius : props.width * 0.90} 
                    innerHoleSize={props.width * scale.radius * scale.innerRadius}
                    width={props.width * scale.width}
                    height={props.height * scale.height}
                    styles={{ ...style.graph, ...style.pie }}                
                    data={data}/>
            case "area":
                return <AreaChart axes data={data} options={options} />            
            case "line":
                return <LineChart axes data={data} options={options} />
            default: 
                return <BarChart axes data={data} options={options} />        
        } 
    }
    
    const returnButton = <Button disabled={props.active || null } 
                        color="yellow" 
                        content="Return" 
                        onClick={props.handleReturn}/>
    
    return (
        // <div style={style.graph}>
            <Panel as="h3" 
            loading={props.loading}
            color="blue" 
            style={style.panel}
            rightItem={props.admin ? returnButton : null}
            header={props.cPoll.title}>
                {displayGraph(props.cPoll)}
                <Legend data={props.cPoll.data} 
                dataId={"key"} 
                config={props.cPoll.data} 
                horizontal/>
            </Panel>
        // </div>
    )
}