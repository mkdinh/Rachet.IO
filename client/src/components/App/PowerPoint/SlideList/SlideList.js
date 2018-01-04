import React from "react";
import SlideItem from "./SlideItem";
import SlideForm from "./SlideForm";

const style = {
    wrapper: { 
        height: "85vh",
        padding: "1rem 0 0 0", 
        borderRight: "1px solid grey",
        overflow: "auto"
     }
}

export default (props) => 
    <div style={style.wrapper}>
        {props.slides.map(slide => 
            <SlideItem 
            key={slide.itemId}
            slide={slide}
            deleteSlide={props.deleteSlide}
            selectSlide={props.selectSlide}
            cSlide={props.cSlide === slide.itemId}/>
        )}
        <SlideForm addSlides={props.addSlides}/>
    </div>