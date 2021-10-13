let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let port = 9595;

let teamsObj = {
  theText: "Select your team and enter the number of Tickets:",
  teams: [
    { text: "Melbourne", value: 0, count: 0 },
    { text: "Port Adelaide", value: 1, count: 0 },
    { text: "Geelong Cats", value: 2, count: 0 },
    { text: "Brisbane Lions", value: 3, count: 0 },
    { text: "Western Bulldogs", value: 4, count: 0 },
    { text: "Sydney Swans", value: 5, count: 0 },
    { text: "GWS Giants", value: 6, count: 0 },
    { text: "Essendon", value: 7, count: 0 },
  ],
};

app.use("/", express.static(path.join(__dirname, "dist/project")));

io.on("connection", (socket) => {
  console.log("new connection made from client with ID=" + socket.id);
  io.emit("data", { teams: teamsObj.teams });

  socket.on("form", (data) => {
      teamsObj.teams[data.index].count += data.number_ticket;
      
    io.sockets.emit("data", { teams: teamsObj.teams });
  });
});
server.listen(port, () => {
  console.log("Listening on port " + port);
});
