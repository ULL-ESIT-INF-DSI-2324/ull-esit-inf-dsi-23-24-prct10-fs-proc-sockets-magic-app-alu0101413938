import net from "net";
import chalk from "chalk";
import { argv } from "process";
import { createInputWithYargs } from "./utils/createInput.js";
// EXAMPLE INTPUS
// MODIFY
// node dist/client/client.js add --user=larzt --id=0 --name=blackLotus --mana=100 --color=green --line=earth --rarity=mythical --rules=none --price=999
// node dist/client/client.js modify --user=larzt --id=0 --name=blackLotus --mana=100 --color=green --line=earth --rarity=mythical --rules=none --price=999999
// REMOVE
// node dist/client/client.js add --user=larzt --id=0 --name=serraAngel --mana=10 --color=red --line=earth --rarity=rare --rules=none --price=20
// node dist/client/client.js remove --user=larzt --id=0 --name=serraAngel --mana=10 --color=red --line=earth --rarity=rare --rules=none --price=20
// SHOW
// node dist/client/client.js add --user=larzt --id=0 --name=vampire --mana=200 --color=multicolor --line=creature --rarity=rare --rules="must be dead" --price=10 --strength=50
// node dist/client/client.js show --user=larzt --id=0 --name=vampire --mana=200 --color=multicolor --line=creature --rarity=rare --rules="must be dead" --price=10 --strength=50
// LIST
// node dist/client/client.js list --user=larzt
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
    client.on('data', (dataChunk) => {
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
            console.log(chalk.green(message.response));
        }
        else {
            console.log(chalk.red(message.response));
        }
        client.emit('end');
    });
    client.on('end', () => {
        console.log("You has been disconnected from the server.");
    });
}
