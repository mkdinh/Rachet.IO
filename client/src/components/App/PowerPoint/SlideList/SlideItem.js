import React from "react";
import { Image, Button } from "semantic-ui-react";


export default (props) => {
    const style = {
        wrapper: { 
            position: "relative", 
            padding: "0 1rem 0 0", 
            margin: "1rem auto",
            width: "75%" 
        },
        button: { 
            position: "absolute", 
            top: "-0.5rem", right: "0rem", zIndex: 5, 
            padding: "0.25rem", fontSize: "1rem" 
        },
        active: {
            boxShadow: "0 0 0 2px #ee442b"
        }
    };

    return (
        <div onClick={() => props.selectSlide(props.slide.itemId)} style={style.wrapper}>
            <Button 
            color="red" 
            icon="delete" 
            style={style.button}
            onClick={() => props.deleteSlide(props.slide.itemId)}/>
            <Image src={props.slide.dataURL} style={props.cSlide ? style.active : null} alt={props.slide.itemId}/>
        </div>
    );
};