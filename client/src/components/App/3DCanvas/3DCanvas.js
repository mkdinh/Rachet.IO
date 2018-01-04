import React, { Component } from "react";
import Camera from "./Engine/Camera";
import Device from "./Engine/Device";
// import UI from "./Graphic/UI";
// import Grid from "./Graphic/Grid";
import Panel from "../../Panel";
import matAl from "./matAl";

const style = {
    wrapper: { display: "flex", justifyContent: "center" },
    canvas: { background: "#000000" }
}

export default class Engine3D extends Component {
    state =  {
        devices: {},
        camera: {},
        ui: {},
        meshes: {
            red: [],
            yellow: [],
            green: [],
            blue: []
        }
    };

    componentDidMount() {
        this.init();
    }

    init = () => {
        let canvas = this.canvas;
        // create device
        let device = new Device(canvas);
        // create camera
        let camera = new Camera([0, 150, 200], [0, 0, 0], [0, 0, 0], [0, 10, 30]);
        // device.grid = new Grid(5, 100, [1, 1, 1, 0.25], [0, 0, 0, 0]);    
        // let ui = new UI(canvas);  

        // create point
        let iPoint  = new matAl.Vector3(0, 0, 0)
        let meshes = [];
        meshes.push(iPoint);

        this.setState({
            device: device,
            camera: camera,
            meshes: meshes
        }, () => requestAnimationFrame(this.drawLoop));
        // called HTML5 rendering loop      
    };
    
    // Render loop handler
    drawLoop = () => {
        let { device, camera, meshes, ui } = this.state;
        // clear canvas
        device.clear();
            
        // render perform matrix transformation
        device.render(camera, meshes);
        // ui.render(camera, meshes);

        // recusrively update canvas
        requestAnimationFrame(this.drawLoop);    
    };

    render() {
        return (
            <div style={style.wrapper}>
                <Panel fluid
                as="h5"
                color="orange"
                header="3D Canvas">
                    <canvas 
                    width={450} 
                    height={450} 
                    style={style.canvas}
                    ref={canvas => this.canvas = canvas}/>
                </Panel>
            </div>
        )
    }
}