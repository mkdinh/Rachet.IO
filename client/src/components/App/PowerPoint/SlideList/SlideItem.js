import React from "react";
import { Image, Button, Icon } from "semantic-ui-react";


export default (props) => {
    const style = {
        wrapper: { 
            position: "relative", 
            padding: "0 1rem 0 0", 
            margin: "1rem auto",
            width: "75%" 
        },
        delete: { 
            position: "absolute", 
            top: "-0.5rem", right: "0rem", zIndex: 5, 
            padding: "0.25rem", fontSize: "1rem" 
        },
        edit: { 
            position: "absolute", 
            top: "-0.5rem", left: "-0.75rem", zIndex: 5, 
            padding: "0.25rem", fontSize: "1rem"
        },
        input: { 
            width: "100%", height: "100%",
            position: "absolute", top: 0, left: 0,
            opacity: 0, zIndex: 1
        },
        active: {
            boxShadow: "0 0 0 2px #ee442b"
        }
    };

    const updateSlide = (ev) => {
        let file = ev.target.files[0];
        // read file and return image data object
        if(file){
            let reader = new FileReader();
            reader.onloadend = ev => {
                let itemId = Math.floor(Math.random() * 10000);
                let slide = {
                    name: file.name,
                    dataURL: "data:image/jpeg;base64," + btoa(ev.target.result),
                    itemId: itemId,
                    note: ""
                };             
                
                    props.updateSlide(slide, props.slide.itemId);
            };
            reader.readAsBinaryString(file);
        };
    };
    

    return (
        <div onClick={() => props.selectSlide(props.slide.itemId)} style={style.wrapper}>
            <Button 
            color="red" 
            icon="delete" 
            style={style.delete}
            onClick={() => props.deleteSlide(props.slide.itemId)}/>
            <Button icon
            color="blue" 
            style={style.edit}>
                <Icon name="upload" style={style.button}/>
                <input 
                type="file" 
                style={style.input}
                onChange={updateSlide}/>
            </Button>
            <Image src={props.slide.dataURL} style={props.cSlide ? style.active : null} alt={props.slide.itemId}/>
        </div>
    );
};