// Import React
//--------------------------------------------------------
import React, { Component } from "react";
import { Transition, List } from "semantic-ui-react";

const style = {
    poster: { fontWeight: "bold" }
};

export default class DisplayMessage extends Component {

    componentDidMount() {
        this.refs.bottom.scrollIntoView({ behaviour: "smooth" })
    }

    componentDidUpdate(props) {
        this.refs.bottom.scrollIntoView({ behaviour: "smooth" })        
    }

    render() {

        const posts = this.props.cRoom.posts || [];
        
        return ( 
            <List ref>
                {posts.map(post =>
                <List.Item key={post._id}>
                    <span style={style.poster}>{`${post.created_by}: `}</span>
                    <span style={style.msg}>{post.message}</span>
                </List.Item>)}
                <div ref="bottom"/>
            </List>
        )
    }
}