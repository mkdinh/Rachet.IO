
import React from "react";
import { List } from "semantic-ui-react";
import Item from "./Item";

export default (props) =>
    <List>
        {props.list.map(poll =>
            <Item key={poll._id} item={poll}/>
        )}
    </List>