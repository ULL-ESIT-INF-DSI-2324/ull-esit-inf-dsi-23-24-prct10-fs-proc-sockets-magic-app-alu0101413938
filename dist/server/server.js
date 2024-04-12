import net from "net";
import { FileManager } from "../cards/fileManager.js";
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
                connection.emit('create', message, (refuse) => {
                    response = GenerateResponse(refuse, message.name);
                });
                break;
            case "remove":
                console.log("Se ha solicitado la creacion de una carta");
                connection.emit('remove', message, (refuse) => {
                    response = GenerateResponse(refuse, message.name);
                });
                break;
            default:
                break;
        }
        connection.write(response);
    });
    connection.on('create', (cardInfo, callback) => {
        const { user, id, name, mana, color, line, rarity, rules, price, modifier } = cardInfo;
        const newCard = {
            cardOwner: user, id: id, name: name, mana: mana,
            color: color, line: line, rarity: rarity,
            rules: rules, price: price, modifier: modifier
        };
        callback(FileManager.Instance().writeOnFile(user, newCard));
    });
}).listen(PORT, () => {
    console.log(`Waiting for clients to connect on PORT: ${PORT}`);
});
