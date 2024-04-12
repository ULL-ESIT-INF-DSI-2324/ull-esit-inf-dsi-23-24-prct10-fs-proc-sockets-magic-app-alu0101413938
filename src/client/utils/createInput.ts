import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export function createInputWithYargs() :object {
  return yargs(hideBin(process.argv))
  .command("add", "Añadir una carta al inventario", {
    user: { type: "string", demandOption: true },
    id: { type: "number", demandOption: true },
    name: { type: "string", demandOption: true },
    mana: { type: "number", demandOption: true },
    color: { type: "string", demandOption: true },
    line: { type: "string", demandOption: true },
    rarity: { type: "string", demandOption: true },
    rules: { type: "string", demandOption: true },
    price: { type: "number", demandOption: true },
  })
  .command("remove", "Eliminar una carta del inventario", {
    user: { type: "string", demmandOption: true},
    id: { type: "number", demmandOption: true}
  })
  .help()
  .argv;
}