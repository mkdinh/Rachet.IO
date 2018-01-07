import React from "react";
import { Button } from "semantic-ui-react";

const style = {
    buttonWrapper: { position: "fixed", bottom: "1rem", left: 0, width: "100%", display: "flex" },
    prevButton: { float: "left", margin: "1rem" },
    nextButton: { float: "right", margin: "1rem" },
    note: { fontSize: "1.5rem", padding: "1rem", lineHeight: "4rem", margin: "0 0 6rem 0" },
    p: { margin: "1rem 0"},
    index: { display: "flex", flexGrow: 2, justifyContent: "center", alignItems: "center", fontSize: "1rem" }
}

export default (props) => 
    <div style={style.wrapper}>
        <div style={style.buttonWrapper}>
            <Button circular
            size="massive"
            icon="left chevron"
            style={style.prevButton}
            onClick={props.prevSlide}/>
            
            <span style={style.index}>{props.index + 1} / {props.length}</span>

            <Button circular
            size="massive"
            icon="right chevron"
            style={style.nextButton}
            onClick={props.nextSlide}/>
        </div>

        <div style={style.note}>
            {props.note ? 
                props.note.split("\n\n").map(el => {
                return <p style={style.p}> {el}  <hr/> </p>
            }) : null}
        </div>

    </div>