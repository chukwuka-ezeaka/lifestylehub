const express = require("express");
const app = express();
const port = 8002;
var server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");

app.use(cors());

var clients = {};

io.on("connection", function(client) {
  client.on(events.USER_CONNECTED, e => {
    let user_id = e.id;
    if (!user_id) return;
    client.user_id = user_id;
    if (clients[user_id]) {
      clients[user_id].push(client);
    } else {
      clients[user_id] = [client];
    }
  });

  client.on(events.PRIVATE_MESSAGE, e => {
    let targetId = e.to;
    let sourceId = client.user_id;
    if (targetId && clients[targetId]) {
      clients[targetId].forEach(cli => {
        cli.emit(events.PRIVATE_MESSAGE, e);
      });
    }

    if (sourceId && clients[sourceId]) {
      clients[sourceId].forEach(cli => {
        cli.emit(events.PRIVATE_MESSAGE, e);
      });
    }
  });

  client.on(events.USER_DISCONNECTED, function() {
    if (!client.user_id || !clients[client.user_id]) {
      return;
    }
    let targetClients = clients[client.user_id];
    for (let i = 0; i < targetClients.length; ++i) {
      if (targetClients[i] == client) {
        targetClients.splice(i, 1);
      }
    }
  });
});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
