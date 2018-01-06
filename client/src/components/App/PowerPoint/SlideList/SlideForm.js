import React from "react";
import { Button, Icon } from "semantic-ui-react";

const style = {
    button: { 
        position: "relative",
        height: "15%",
        width: "96%"
    },
    icon: { margin: 0 },
    input: {
        width: "100%", height: "100%",
        position: "absolute", top: 0, left: 0,
        opacity: 0
    }
}

export default (props) => {
    
    const addSlide = (ev) => {
        let files = ev.target.files;
        let slides = [];
        // read each files for dataURL and return image data object
        if(files.length > 0){
            for(let file of files) {
                let reader = new FileReader();
                reader.onloadend = ev => {
                    let itemId = Math.floor(Math.random() * 10000);
                    let slide = {
                        name: file.name,
                        dataURL: "data:image/jpeg;base64," + btoa(ev.target.result),
                        itemId: itemId,
                        note: ""
                    };             
                    slides.push(slide);
                    
                    if(slides.length === files.length) {
                        props.addSlides(slides);
                    };
                }

                reader.readAsBinaryString(file)
            };
        };
    }

    return (
        <Button style={style.button}>
            <Icon style={style.icon} size="huge" name="plus"/>
            <input multiple
            type="file"
            style={style.input}
            onChange={addSlide}/>
        </Button>
    )
}