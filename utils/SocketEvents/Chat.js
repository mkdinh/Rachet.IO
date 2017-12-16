exports = module.exports = (io) => {
    // initial connection
    io.on("connection", (socket) => {
        // on connection, emit welcoming message
        socket.emit("initialize", {msg: "Hello there"})
        // on receiving a post event, emit message to other sockets
        socket.on("post", (data) => {
        socket.broadcast.emit("new post", data);  
        })
        // on disconnect, emit that user is leaving
        socket.on("disconnect", () => {
            io.emit("user disconnected")
        })
    })
}