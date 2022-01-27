const http = require("http");
const serverPort = 3001;
const clientPort = 3000;
const hostname = "localhost";
const express = require("express");
const app = express();
const webSocket = require("websocket").server;
const clients = new Map(); // HashMap to store clients
const games = new Map(); // HashMap to store games
const httpServer = http.createServer();
const webSocketServer = new webSocket({ httpServer: httpServer });

// Server
webSocketServer.on("request", (req) => {
  const tcpConnection = req.accept(null, req.origin, null);
  ()=>{

  }
  // accepting the request
  tcpConnection.on("open", () => console.log("Connection is now opened!"));
  tcpConnection.on("close", () => console.log("Connection is now closed!"));
  // receiving the message
  tcpConnection.on("message", (msg) => {
    console.log("Message received!");
    const req = JSON.parse(msg.utf8Data); // Create game message object
    console.log(req);
    if (req.method == "create") {
      const clientId = req.clientId;
      console.log(`Game is being created for ${clientId} ...`);
      const gameId = guid(); // generating a new game
      games.set(gameId, {
        gameId: gameId,
        tokens: 33,
        players: [],
        state: {},
      });
      const res = {
        // creating a response
        method: "create",
        game: games.get(gameId),
      };
      const clientServerConnection = clients.get(clientId).connection;
      clientServerConnection.send(JSON.stringify(res));
      console.log(
        `A Game for ${JSON.stringify(
          games.get(gameId)
        )} is created successfully!`
      );
    }
    if (req.method == "join") {
      const clientId = req.clientId;
      const gameId = req.gameId;
      if (!games.has(gameId)) {
        console.error("Game not found with id: " + gameId);
        return;
      }
      const game = games.get(gameId);
      console.log("game is " + JSON.stringify(game, null, "  "));
      if (game.players.length == 0) {
        game.players.push({
          clientId: clientId,
          color: "Red",
        });
      } else if (game.players.length == 1) {
        game.players.push({
          clientId: clientId,
          color: "Blue",
        });
      } else if (game.players.length == 2) {
        game.players.push({
          clientId: clientId,
          color: "Green",
        });
      } else {
        console.log("More players are trying to join . ABORTING their req...");
        return;
      }
      const res = {
        method: "join",
        game: game,
      };
      games.set(gameId, game);
      // Now send res to every client
      game.players.forEach(function (player) {
        clients.get(player.clientId).connection.send(JSON.stringify(res));
      });
    }
    if (req.method == "play") {
      const clientId = req.clientId;
      const gameId = req.gameId;
      const TokenId = req.TokenId;
      console.log(games.get(gameId));
      let gameState = games.get(gameId).state;
      const playerColor = req.playerColor;
      if (!gameState) gameState = {};
      gameState[TokenId] = playerColor;
      const game = games.get(gameId);
      game.state = gameState;
      games.set(gameId, game);
      res = { method: "update", state: games.get(gameId).state };
      console.log("length is " + Object.keys(gameState).length);
      // console.log(JSON.stringify(games.get(gameId).state))
      game.players.forEach((player) => {
        clients.get(player.clientId).connection.send(JSON.stringify(res));
      });
    }
  });
  // creating a client GUID
  const clientId = guid();
  clients.set(clientId, {
    connection: tcpConnection,
  });
  // generating a data to be transfered (payload)
  const dataTransfer = {
    method: "connect",
    clientId: clientId,
  }; // like a PAYLOAD data which means data to b  transferred
  console.log(`A client ${clientId} has joined the server ...`);
  tcpConnection.send(JSON.stringify(dataTransfer)); // sending back response of client saying to connect this clientID
});

// Client
app.get("/", (req, res) => {
  console.log(req.url);
  res.sendFile(__dirname + "/index.html");
});

// Server Port
httpServer.listen(process.env.PORT || serverPort, hostname, () => {
  console.log(`HTTP Server started on http://${hostname}:${serverPort}/`);
});
// Client Port
app.listen(process.env.PORT ||clientPort, function () {
  console.log(`Client Server started on http://${hostname}:${clientPort}/`);
});
// GUID of 32 charachters
const guid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};
