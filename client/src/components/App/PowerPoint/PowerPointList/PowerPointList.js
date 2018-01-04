import React from "react";
import Panel from "../../../Panel";
import List from "./List";
import PowerPointForm from "./PowerPointForm";

const style = {
    panel: { margin: "0 0 1rem 0", width: "30vw" }
}

export default (props) => {

    return (
        <div>
            <Panel style={style.panel}>
                <List list={props.list}/>
                <PowerPointForm/>
            </Panel>
        </div>
    )
}

        

