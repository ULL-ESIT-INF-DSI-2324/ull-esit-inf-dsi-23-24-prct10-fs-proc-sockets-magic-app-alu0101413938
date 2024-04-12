import net from "net";
import { FileManager } from "../cards/fileManager.js";
import { CardData } from "../cards/card.js";
import { GenerateResponse } from "./utils/generateResponse.js";

const PORT = 3000;

net.createServer((connection) => {
  console.log('A client has connected');

  let wholeData = '';
  connection.on('data', (dataChunk) => {
    wholeData += dataChunk;
    let messageLimit = wholeData.indexOf('\n');
    while (messageLimit !== -1) {
      const message = wholeData.substring(0, messageLimit);
      wholeData = wholeData.substring(messageLimit + 1);
      connection.emit('request', JSON.parse(message));
      messageLimit = wholeData.indexOf('\n');
    }
  });

  // request que recibe del cliente
  connection.on('request', (message) => {
    let response = "";
    switch (message._[0]) {
      case "add":
        console.log("Se ha solicitado la creacion de una carta");
        connection.emit('create', message, (refuse :boolean) => {
          response = GenerateResponse(refuse, `Add card with name: ${message.name}`);
        })
        break;
      case "remove":
        console.log("Se ha solicitado la eliminacion de una carta");
        connection.emit('remove', message, (refuse :boolean) => {
          response = GenerateResponse(refuse, `Remove card with id: ${message.id}`);
        })
        break;
      default:
        console.log("The request could not be processed");
        response = GenerateResponse(true, `Can not .`);
        break;
    }
    connection.write(response);
  })

  connection.on('create', (cardInfo, callback) => {
    const {user, id, name, mana, color, line, rarity, rules, price, special} = cardInfo;
    if (line == "planeswalker" || line == "creature" && special == "") {
      callback(true)
    } else {
      const newCard :CardData = {
        cardOwner :user, id :id, name :name, mana :mana,
        color :color, line :line, rarity :rarity,
        rules :rules, price :price, special :special
      }
      callback(FileManager.Instance().writeOnFile(user, newCard));
    }
  })

  connection.on('remove', (info, callback) => {
    const {user, id} = info;
    callback(FileManager.Instance().removeFromFile(user, id));
  })

}).listen(PORT, () => {
  console.log(`Waiting for clients to connect on PORT: ${PORT}`);
})