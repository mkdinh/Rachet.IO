import React from "react";
import { List, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import actions from "../../../../utils/actions";


const PollItem = (props) => {
    
    const style = {
        wrapper: { 
            display: "flex", 
            boxShadow: "0 0 2.5px grey", 
            padding: "0.5rem 1rem",
            margin: "0.5rem 0"
        },
        title: { flexGrow: 1 }
    }

    let loading = false;

    const selectPoll = () => 
        props.dispatch(actions.Poll.findOne(props.item._id))
    

    const deletePoll = () => 
        props.dispatch(actions.Poll.deleteOne(props.item._id))

    return(
        <List.Item as="a" style={style.wrapper} onClick={selectPoll}>
            <span style={style.title}>{props.item.title}</span>
            <Icon loading={loading} name="delete" color="red" onClick={deletePoll}/>
        </List.Item>
    )
};

const mapStateToProps = (state) => {
    return ({})
};

export default connect(mapStateToProps)(PollItem);