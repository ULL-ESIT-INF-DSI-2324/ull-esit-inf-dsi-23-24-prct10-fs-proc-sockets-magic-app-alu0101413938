import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import { Card } from "./magicCards/card.js";
import { CardManager } from "./magicCards/cardsManager.js";
import { Color } from "./magicCards/enums/color.js";
import { Line } from "./magicCards/enums/line.js";
import { Rarity } from "./magicCards/enums/rarity.js";

// EXAMPLE INTPUS
// node dist/index.js add --user=larzt --id=0 --name=blackLotus --mana=100 --color=green --line=earth --rarity=mythical --rules=none --price=999
// node dist/index.js add --user=larzt --id=1 --name=serraAngel --mana=10 --color=red --line=earth --rarity=rare --rules=none --price=20
// node dist/index.js add --user=larzt --id=2 --name=lightningBolt --mana=20 --color=white --line=earth --rarity=common --rules=none --price=10
// node dist/index.js add --user=larzt --id=3 --name=vampire --mana=200 --color=multicolor --line=creature --rarity=rare --rules="must be dead" --price=10 --strength=50
// node dist/index.js update --user=larzt --id=2 --name=lightningBolt --mana=20 --color=blue --line=earth --rarity=common --rules=none --price=10

/**
 * cardsManager is an instance of CardManager class responsible for managing cards.
 * Sets the file name for database. 
 */
export const cardsManager: CardManager = new CardManager();
cardsManager.setFileName('./src/database.json');

/**
 * Main function to handle commands using yargs.
 */
yargs(hideBin(process.argv))
.command('add', 'Add new card', {
  user: {
    describe: 'Nombre del usuario',
    demandOption: true,
    type: 'string'
  },
  id: {
    describe: 'ID de la carta',
    demandOption: true,
    type: 'number'
  },
  name: {
    describe: 'Nombre de la carta',
    demandOption: true,
    type: 'string'
  },
  mana: {
    describe: 'Costo de mana',
    demandOption: true,
    type: 'number'
  },
  color: {
    describe: 'Color de la carta',
    demandOption: true,
    choices: Object.values(Color)
  },
  line: {
    describe: 'Tipo de línea',
    demandOption: true,
    choices: Object.values(Line)
  },
  rarity: {
    describe: 'Rareza de la carta',
    demandOption: true,
    choices: Object.values(Rarity)
  },
  rules: {
    describe: 'Reglas de la carta',
    demandOption: true,
    type: 'string'
  },
  price: {
    describe: 'Precio de la carta',
    demandOption: true,
    type: 'number'
  },
  modifier: {
    describe: 'Modificador de la carta (solo para planeswalker o creature)',
    type: 'number'
  }
}, (argv) => {
  const { user, id, name, mana, color, line, rarity, rules, price, modifier } = argv;
  if ((line === 'planeswalker' || line === 'creature') && !modifier) {
    console.error('Se requiere un modificador para las cartas de tipo planeswalker o creature.');
    process.exit(1);
  }
  cardsManager.addCard(new Card(user, id, name, mana, color, line, rarity, rules, price, modifier));
})
.command('list', 'Lista todas las cartas de un usuario.', {
  user: {
    describe: 'Nombre del usuario',
    demandOption: true,
    type: 'string'
  }
}, (argv) => {
  cardsManager.list(argv.user);
})
.command('read', 'Muestra la carta del usuario con el ID indicado.', {
  user: {
    describe: 'Nombre del usuario',
    demandOption: true,
    type: 'string'
  },
  id: {
    describe: 'ID de la carta',
    demandOption: true,
    type: 'number'
  }
}, (argv) => {
  const { user, id } = argv; 
  cardsManager.read(user, id);
})
.command('remove', 'Elimina una carta del usuario indicado segun un ID.', {
  user: {
    describe: 'Nombre del usuario',
    demandOption: true,
    type: 'string'
  },
  id: {
    describe: 'ID de la carta',
    demandOption: true,
    type: 'number'
  }
}, (argv) => {
  const { user, id } = argv; 
  cardsManager.remove(user, id);
})
.command('update', 'Permite actualizar una carta segun un ID.', {
  user: {
    describe: 'Nombre del usuario',
    demandOption: true,
    type: 'string'
  },
  id: {
    describe: 'ID de la carta',
    demandOption: true,
    type: 'number'
  },
  name: {
    describe: 'Nombre de la carta',
    demandOption: true,
    type: 'string'
  },
  mana: {
    describe: 'Costo de mana',
    demandOption: true,
    type: 'number'
  },
  color: {
    describe: 'Color de la carta',
    demandOption: true,
    choices: Object.values(Color)
  },
  line: {
    describe: 'Tipo de línea',
    demandOption: true,
    choices: Object.values(Line)
  },
  rarity: {
    describe: 'Rareza de la carta',
    demandOption: true,
    choices: Object.values(Rarity)
  },
  rules: {
    describe: 'Reglas de la carta',
    demandOption: true,
    type: 'string'
  },
  price: {
    describe: 'Precio de la carta',
    demandOption: true,
    type: 'number'
  }
},  (argv) => {
  const { user, id, name, mana, color, line, rarity, rules, price } = argv;
  cardsManager.updateCard(new Card(user, id, name, mana, color, line, rarity, rules, price));
})
.help()
.argv;