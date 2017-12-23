// Import React
//--------------------------------------------------------
import React, { Component } from "react";
import { List, Icon } from "semantic-ui-react";
import RoomForm from "../../Form/Room";

const style = {
    poster: { fontWeight: "bold" },
    num: { fontSize: "1.25rem" },
    name: { fontWeight: "bold", fontSize: "1.5rem", flexGrow: 1 },
    icon: { fontSize: "1.5rem" },
    item: { 
        display: "flex", 
        flexGrow: 1,
        alignItems: "center", 
        padding: "0.5rem",
        margin: "0.25rem 0",  
        boxShadow: "0 0 5px #e6e6e7",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    }
};

export default class DisplayRoom extends Component {

    handleClick = (id) => {
        this.props.load()
        this.props.selectRoom(id)
        .then(doc => this.props.load());
    }

    handleDelete = (id) => { 
        this.props.load()
        this.props.deleteRoom(id)
        .then(doc => {
            // send socket info here
        });
    }

    
    render() {
        const users = this.props.users || [];
        const roomList = this.props.roomList || [];
        
        return (
            <List style={style.list} divided celled>
                {this.props.admin ? <List.Item as="div" style={style.item}>
                    <RoomForm createRoom={this.props.createRoom}/>
                </List.Item> : null}

                {roomList.map(room =>
                    <List.Item as="a" onClick={() => this.handleClick(room._id)} 
                    key={room._id} 
                    style={style.item}>
                        <List.Content style={style.num} floated='left'>
                            {users.filter(el => el.cRoom._id === room._id).length}
                        </List.Content>
                        <List.Content style={style.name}>
                            {room.name}
                        </List.Content>

                        {this.props.admin ? 
                            <List.Content float="right" style={style.icon}>
                                <Icon color="red" 
                                name="delete" 
                                onClick={() => this.handleDelete(room._id)}/>
                            </List.Content>
                        :   null}
                    </List.Item>
                )}
            </List>
        )
    }
}