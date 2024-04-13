import net from "net";
import { FileManager } from "../cards/fileManager.js";
import { GenerateResponse } from "./utils/generateResponse.js";
import { GenerateColoredResponse } from "./utils/generateColoredResponse.js";
import { GenerateMultiColoredResponses } from "./utils/multiColoredResponse.js";
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
            case "update":
                console.log("Se ha solicitado la actualizacion de una carta");
                connection.emit('update', message, (refuse) => {
                    console.log('Emit Update refuse:', refuse);
                    response = GenerateResponse(refuse, `Update card with id: ${message.id}`);
                    connection.write(response);
                });
                break;
            case "show":
                console.log("Se ha solicitado mostrar una carta");
                connection.emit('show', message, (refuse, showCard) => {
                    console.log('Emit Show refuse:', refuse);
                    if (showCard) {
                        response = GenerateColoredResponse(refuse, showCard);
                    }
                    else {
                        response = GenerateResponse(refuse, `Update card with id: ${message.id}`);
                    }
                    connection.write(response);
                });
                break;
            case "list":
                console.log("Se ha solicitado mostrar las cartas de un usuario");
                connection.emit('list', message, (refuse, showCard) => {
                    console.log('Emit List refuse:', refuse);
                    if (showCard) {
                        response = GenerateMultiColoredResponses(refuse, showCard);
                    }
                    else {
                        response = GenerateResponse(refuse, `Update card with id: ${message.id}`);
                    }
                    connection.write(response);
                });
                break;
            default:
                console.log("La peticion no se ha podido procesar.");
                response = GenerateResponse(true, `The request could not be processed.`);
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
            FileManager.Instance().writeOnFile(user, newCard, (refuse) => {
                console.log('Write refuse:', refuse);
                callback(refuse);
            });
        }
    });
    connection.on('remove', (info, callback) => {
        const { user, id } = info;
        FileManager.Instance().removeFromFile(user, id, (refuse) => {
            console.log('Remove refuse:', refuse);
            callback(refuse);
        });
    });
    connection.on('update', (cardInfo, callback) => {
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
            FileManager.Instance().updateFile(user, newCard, (refuse) => {
                console.log('Update refuse:', refuse);
                callback(refuse);
            });
        }
    });
    connection.on('show', (info, callback) => {
        const { user, id } = info;
        FileManager.Instance().readFile(user, id, (refuse, showCard) => {
            console.log('Show refuse:', refuse);
            if (showCard) {
                callback(refuse, showCard);
            }
            else {
                callback(refuse, undefined);
            }
        });
    });
    connection.on('list', (info, callback) => {
        const { user } = info;
        FileManager.Instance().readMultipleFiles(user, (refuse, showCards) => {
            console.log('List refuse:', refuse);
            if (showCards) {
                callback(refuse, showCards);
            }
            else {
                callback(refuse, undefined);
            }
        });
    });
}).listen(PORT, () => {
    console.log(`Waiting for clients to connect on PORT: ${PORT}`);
});
