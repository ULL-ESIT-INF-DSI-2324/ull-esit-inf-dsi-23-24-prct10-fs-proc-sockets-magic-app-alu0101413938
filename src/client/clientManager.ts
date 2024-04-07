import EventEmitter from "events";
import yargs from "yargs";

export class CardServerClient extends EventEmitter {
  constructor() {
    super();
  }

  generate() {
    const argv = yargs(process.argv.slice(2))
    .command('add', 'Añadir una carta al inventario', {
      user: { type: 'string', demandOption: true },
      id: { type: 'number', demandOption: true },
      name: { type: 'string', demandOption: true },
      mana: { type: 'number', demandOption: true },
      color: { type: 'string', demandOption: true },
      line: { type: 'string', demandOption: true },
      rarity: { type: 'string', demandOption: true },
      rules: { type: 'string', demandOption: true },
      price: { type: 'number', demandOption: true }
    })
    .help()
    .argv;

    this.emit('commandReceived', argv);
  }
}