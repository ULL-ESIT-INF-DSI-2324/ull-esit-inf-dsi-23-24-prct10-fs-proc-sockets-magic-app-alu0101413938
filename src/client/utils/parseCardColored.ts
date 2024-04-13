import chalk from "chalk";
import { CardData } from "../../cards/card.js";
import * as crypto from 'crypto';
import { Color } from "../../cards/enums/color.js";
import { availableColors } from "./avaibleColors.js";

export function coloredCards(card :CardData) {
  const barrier = "\n======================"
  const info = `ID: ${card.id}\nName: ${card.name}\nMana: ${card.mana}\nLine: ${card.line}\nRarity: ${card.rarity}\nRules: ${card.rules}\nSpecial: ${card.special}\nPrice: ${card.price}`;
  let multiColorInfo: string[] = info.split(/\n/g);
  switch (card.color) {
    case Color.WHITE:
      console.log(barrier);
      console.log(chalk.white(info));
      break;
    case Color.BLUE:
      console.log(barrier);
      console.log(chalk.blue(info));
      break;
    case Color.BLACK:
      console.log(barrier);
      console.log(chalk.black.bgWhite(info));
      break;
    case Color.RED:
      console.log(barrier);
      console.log(chalk.red(info));
      break;
    case Color.GREEN:
      console.log(barrier);
      console.log(chalk.green(info));
      break;
    case Color.COLORLESS:
      console.log(barrier);
      console.log(info);
      break;
    case Color.MULTICOLOR:
      console.log(barrier);
      multiColorInfo = multiColorInfo.map((element) => {
        // Obtener un índice aleatorio para seleccionar un color de la lista
        const buf = crypto.randomBytes(1);
        const randomIndex = buf.readUInt8(0) % availableColors.length;
        // Aplicar el color al elemento
        return availableColors[randomIndex](element);
      });
      multiColorInfo.forEach((element) => {
        console.log(element);
      })
      break;
    }
}