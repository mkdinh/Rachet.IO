import React from "react";
import Panel from "../../../Panel";
import List from "./List";
import PowerPointForm from "./PowerPointForm";

const style = {
    panel: { margin: "0 0 1rem 0", width: "30vw" }
}

export default (props) => {

    const loading = props.list.length === 0;

    return (
        <div>
            <Panel loading={loading} style={style.panel}>
                <List list={props.list}/>
                <PowerPointForm/>
            </Panel>
        </div>
    )
}

        

