// Import dependencies
//--------------------------------------------------------
const express = require("express");
const app = express();
const server = require("http").Server(app);
const PORT = process.env.PORT || 3001;
const io = require("socket.io")(server);
const router = require("./routes")
const path = require("path");
const mongoose = require("mongoose")
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

// Configure MongoDB
//--------------------------------------------------------
// Leverage ES6 Promises
mongoose.Promise = global.Promise;

const LOCAL_URI = "mongodb://localhost/rachet"

// connect to database
mongoose.connect(process.env.MONGODB_URI || LOCAL_URI, {
    useMongoClient: true
});

// Configure Express
//--------------------------------------------------------

const indexFile = path.join(__dirname, "./client/build/");

// allow express to use static files from yarn build
app.use(express.static(indexFile));

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 10000000000000000000
}));

app.use(cookieParser());

app.use(session({
    secret: "rachet",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

// configure socket.io
//--------------------------------------------------------

// initial connection
io.of("/chat").on("connection", socket => {

    const chat = io.of("/chat");

    socket.user = {
        id: socket.client.id,
        name: "",
        cRoom: "lobby",
        connect: true
    };

    // on connection, emit welcoming message
    socket.emit("initialize", socket.user);    
    
    const getInfo = (sockets) => {
        let users = [];
        sockets.forEach(id => chat.sockets[id].user.connect ? 
                users.push(chat.sockets[id].user) : null)
        return users;
    }
    
    const updateRoster = () => {
        chat.clients((err, clients) => {
            let users = getInfo(clients);
            chat.emit("update roster", users);         
        });
    }

    socket.on("connect to lobby", name => {
        // on connecting to lobby, get list of all current users in the lobby
        socket.user.name = name;
        socket.leave(socket.user.cRoom._id);
        socket.user.cRoom = "lobby";
        socket.join("lobby");
        updateRoster();
    });

    socket.on("connect to room", room => {
        socket.leave("lobby");
        socket.join(room._id);
        socket.user.cRoom = room;
        updateRoster(room._id)
    });

    socket.on("new post", post => {
        const roomId = post.roomId;
        chat.in(roomId).emit("new post", post);
    })

    socket.on("disconnect", data => {
        socket.user.connect = false;
        updateRoster();
    });
});

io.of("/poll").on("connection", socket => {

    const poll = io.of("/poll");
    socket.on("update-poll", id => poll.emit("update-poll", id));
})

io.of("/powerpoint").on("connection", socket => {

    const pp = io.of("/powerpoint");
    socket.on("update-current-slide", itemId => pp.emit("update-current-slide", itemId));
    socket.on("toggle-modal", itemId => pp.emit("toggle-modal", itemId));
})

// Start Server
//--------------------------------------------------------
server.listen(PORT, () => console.log(`listen to port: ${PORT}`))