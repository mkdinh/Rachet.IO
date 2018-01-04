import React from "react";
import { List, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import actions from "../../../../utils/actions";
import { Link } from "react-router-dom";

const PollItem = (props) => {
    
    const style = {
        wrapper: { 
            display: "flex", 
            boxShadow: "0 0 2.5px grey", 
            padding: "0.5rem 1rem",
            margin: "0.5rem 0"
        },
        title: { flexGrow: 1 },
        button: { padding: "0.25rem", margin: 0 }
    }

    const deletePoll = (ev) => {
        ev.preventDefault();
        props.dispatch(actions.PowerPoint.deleteOne(props.item._id));
    }

    return(
        <Link to={`/PowerPoint/${props.item._id}`}>
            <List.Item as="li" style={style.wrapper}>
                <span style={style.title}>{props.item.title}</span>
                <Button icon="delete" color="red" style={style.button} onClick={deletePoll}/>
            </List.Item>
        </Link>
    )
};

const mapStateToProps = (state) => {
    return ({})
};

export default connect(mapStateToProps)(PollItem);