import React from "react";
import Panel from "../../../Panel";
import List from "./List";
import PollForm from "./PollForm";

const style = {
    panel: { margin: "0 0 1rem 0", width: "30vw" }
}

export default (props) => 
    <div>
        <Panel style={style.panel}>
            <List list={props.list}/>
            <PollForm/>
        </Panel>
    </div>

        

