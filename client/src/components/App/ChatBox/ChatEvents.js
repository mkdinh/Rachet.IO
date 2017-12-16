
export default (socket, _this) => {

    socket.on("initialize", user => {
        // init chatsocket with user info
        _this.setState({ cUser: user });
    })

    socket.on("update roster", users => {
        _this.setState({users: users});
    })

    socket.on("new post", post => {
        _this.updateRoom()
        .then(doc => null);
    })

    // socket.on("connect to lobby", users => {
    //     // set the all users data to render who is online
    //     _this.setState({users: users});
    // })

    // socket.on("connect to room", users => {
    //     // get all users in the current room
    //     _this.setState({users: users});
    // })
    
}