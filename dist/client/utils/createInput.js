import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Color } from "../../cards/enums/color.js";
import { Line } from "../../cards/enums/line.js";
import { Rarity } from "../../cards/enums/rarity.js";
export function createInputWithYargs() {
    return yargs(hideBin(process.argv))
        .command("add", "Añadir una carta al inventario", {
        user: { type: "string", demandOption: true, describe: "Nombre del usuario" },
        id: { type: "number", demandOption: true, describe: "ID de la carta" },
        name: { type: "string", demandOption: true, describe: "Nombre de la carta" },
        mana: { type: "number", demandOption: true, describe: "Coste de mana" },
        color: { type: "string", demandOption: true, describe: "Color de la carta", choices: Object.values(Color) },
        line: { type: "string", demandOption: true, describe: "Tipo de especie", choices: Object.values(Line) },
        rarity: { type: "string", demandOption: true, describe: "Rareza de la carta", choices: Object.values(Rarity) },
        rules: { type: "string", demandOption: true, describe: "Reglas de la carta" },
        price: { type: "number", demandOption: true, describe: "Precio de la carta" },
        special: { type: "number", describe: "Atributo especial para Planeswalker o Creatures" },
    })
        .command("remove", "Eliminar una carta del inventario", {
        user: { type: "string", demmandOption: true },
        id: { type: "number", demmandOption: true }
    })
        .help()
        .argv;
}
