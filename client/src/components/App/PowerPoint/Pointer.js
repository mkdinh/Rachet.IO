import React from "react";
import { Grid, Button } from "semantic-ui-react";

const style = {
    buttonWrapper: { position: "fixed", bottom: "1rem", left: 0, width: "100%" },
    prevButton: { float: "left", margin: "1rem" },
    nextButton: { float: "right", margin: "1rem" },
    note: { fontSize: "2rem", padding: "1rem" }
}

export default (props) => 
    <div style={style.wrapper}>
        <div style={style.buttonWrapper}>
            <Button circular
            size="massive"
            icon="left chevron"
            style={style.prevButton}
            onClick={props.prevSlide}/>

            <Button circular
            size="massive"
            icon="right chevron"
            style={style.nextButton}
            onClick={props.nextSlide}/>
        </div>

        <div style={style.note}>
            {props.note}
        </div>

    </div>