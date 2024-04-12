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
                    console.log('Emit Add refuse:', refuse);
                    response = GenerateResponse(refuse, `Add card with name: ${message.name}`);
                    connection.write(response);
                });
                break;
            case "remove":
                console.log("Se ha solicitado la eliminacion de una carta");
                connection.emit('remove', message, (refuse) => {
                    console.log('Emit Remove refuse:', refuse);
                    response = GenerateResponse(refuse, `Remove card with id: ${message.id}`);
                    connection.write(response);
                });
                break;
            default:
                console.log("The request could not be processed");
                response = GenerateResponse(true, `Can not .`);
                connection.write(response);
                break;
        }
    });
    connection.on('create', (cardInfo, callback) => {
        const { user, id, name, mana, color, line, rarity, rules, price, special } = cardInfo;
        if (line == "planeswalker" || line == "creature" && special == "") {
            callback(true);
        }
        else {
            const newCard = {
                cardOwner: user, id: id, name: name, mana: mana,
                color: color, line: line, rarity: rarity,
                rules: rules, price: price, special: special
            };
            callback(FileManager.Instance().writeOnFile(user, newCard));
        }
    });
    connection.on('remove', (info, callback) => {
        const { user, id } = info;
        FileManager.Instance().removeFromFile(user, id, (refuse) => {
            console.log('Remove refuse:', refuse);
            callback(refuse);
        });
    });
}).listen(PORT, () => {
    console.log(`Waiting for clients to connect on PORT: ${PORT}`);
});
