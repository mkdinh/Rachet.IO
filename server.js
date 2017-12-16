// Import dependencies
//--------------------------------------------------------
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const IO = require("socket.io");
const router = require("./routes")
const io = new IO(server);
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

const indexFile = path.join(__dirname, "./client/build/index.html");

// allow express to use static files from yarn build
app.use(express.static(indexFile));

// // serve index.html to the browser
app.use((req , res) => {
    res.sendFile(indexFile)
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: "rachet",
    resave: true,
    saveUninitialized: true
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
    }

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
})

// Start Server
//--------------------------------------------------------
server.listen(PORT, () => console.log(`listen to port: ${PORT}`))