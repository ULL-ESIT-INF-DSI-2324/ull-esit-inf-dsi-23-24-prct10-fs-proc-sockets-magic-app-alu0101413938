import net from "net";
import chalk from "chalk";
import { argv } from "process";
import { createInputWithYargs } from "./utils/createInput.js";
import { coloredCards } from "./utils/parseCardColored.js";
// EXAMPLE INTPUS
// MODIFY
// node dist/client/client.js add --user=larzt --id=0 --name=blackLotus --mana=100 --color=green --line=earth --rarity=mythical --rules=none --price=999
// node dist/client/client.js update --user=larzt --id=0 --name=blackLotus --mana=100 --color=green --line=earth --rarity=mythical --rules=none --price=999999
// REMOVE
// node dist/client/client.js add --user=larzt --id=0 --name=serraAngel --mana=10 --color=red --line=earth --rarity=rare --rules=none --price=20
// node dist/client/client.js remove --user=larzt --id=0 --name=serraAngel --mana=10 --color=red --line=earth --rarity=rare --rules=none --price=20
// SHOW
// node dist/client/client.js add --user=larzt --id=0 --name=vampire --mana=200 --color=multicolor --line=creature --rarity=rare --rules="must be dead" --price=10 --strength=50
// node dist/client/client.js show --user=larzt --id=0 --name=vampire --mana=200 --color=multicolor --line=creature --rarity=rare --rules="must be dead" --price=10 --strength=50
// LIST
// node dist/client/client.js list --user=larzt
// Comprobar eliminar carta de un usuario desconocido
// Comprobar eliminar carta no existente
// Comprobar actualizar carta de un usuario desconocido
// Comprobar actualizar carta no existente
// Comprobar mostrar carta de un usuario desconocido
// Comprobar mostrar carta no existente
// Comprobar listar cartas de un usuario desconocido
const PORT = 3000;
if (argv.length < 3) {
    console.log('Please, provide a command or use "help"');
}
else {
    const client = net.connect({ port: PORT });
    const input = createInputWithYargs();
    const jsonCommand = JSON.stringify(input);
    client.write(jsonCommand + '\n');
    let wholeData = '';
    client.on('data', async (dataChunk) => {
        wholeData += dataChunk;
        let messageLimit = wholeData.indexOf('\n');
        while (messageLimit !== -1) {
            const message = wholeData.substring(0, messageLimit);
            wholeData = wholeData.substring(messageLimit + 1);
            client.emit('response', JSON.parse(message));
            messageLimit = wholeData.indexOf('\n');
        }
    });
    // respuesta que recibe del servidor
    client.on('response', (message) => {
        // console.log(`Respuesta recibida por parte del servidor: ${message}`);
        if (message.code == "accepted") {
            if (message.colored) {
                if (message.multiple) {
                    const cards = JSON.parse(message.response);
                    client.emit('multiple', cards);
                }
                else {
                    const card = JSON.parse(message.response);
                    client.emit('colored', card);
                }
            }
            else {
                console.log(chalk.green(message.response));
            }
        }
        else {
            console.log(chalk.red(message.response));
        }
        client.emit('end');
    });
    client.on('multiple', (cards) => {
        cards.forEach((card) => {
            coloredCards(card);
        });
    });
    client.on('colored', (card) => {
        coloredCards(card);
    });
    client.on('end', () => {
        console.log("You has been disconnected from the server.");
    });
    client.on('error', (err) => {
        console.error(chalk.yellow(`Se produjo un error al conectar con el servidor. Error ${err.message}`));
    });
}
