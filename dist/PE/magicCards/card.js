import chalk from "chalk";
import { Color } from "./enums/color.js";
import { Line } from "./enums/line.js";
import * as crypto from 'crypto';
const availableColors = [
    chalk.red,
    chalk.green,
    chalk.blue,
    chalk.yellow,
    chalk.magenta,
    chalk.cyan,
    chalk.white,
    chalk.gray,
    chalk.black,
];
/**
 * Card class represents a single card.
 */
export class Card {
    cardOwner;
    id;
    name;
    mana;
    color;
    line;
    rarity;
    rules;
    price;
    modifier;
    constructor(cardOwner, id, name, mana, color, line, rarity, rules, price, modifier) {
        this.cardOwner = cardOwner;
        this.id = id;
        this.name = name;
        this.mana = mana;
        this.color = color;
        this.line = line;
        this.rarity = rarity;
        this.rules = rules;
        this.price = price;
        this.modifier = modifier;
    }
    /**
     * Gets the modifier of the card.
     * @returns The modifier of the card.
     */
    getModifier() {
        let mod = 0;
        if (typeof this.modifier == 'number') {
            if (this.line == Line.PLANESWALKER || this.line == Line.CREATURE) {
                mod = this.modifier;
            }
        }
        return mod;
    }
    /**
     * Gets the owner of the card.
     * @returns The owner of the card.
     */
    getCardOwner() {
        return this.cardOwner;
    }
    /**
     * Gets the ID of the card.
     * @returns The ID of the card.
     */
    getId() {
        return this.id;
    }
    /**
     * Gets the name of the card.
     * @returns The name of the card.
     */
    getName() {
        return this.name;
    }
    /**
     * Gets the mana cost of the card.
     * @returns The mana cost of the card.
     */
    getMana() {
        return this.mana;
    }
    /**
     * Gets the color of the card.
     * @returns The color of the card.
     */
    getColor() {
        return this.color;
    }
    /**
     * Gets the line of the card.
     * @returns The line of the card.
     */
    getLine() {
        return this.line;
    }
    /**
     * Gets the rarity of the card.
     * @returns The rarity of the card.
     */
    getRarity() {
        return this.rarity;
    }
    /**
     * Gets the rules of the card.
     * @returns The rules of the card.
     */
    getRules() {
        return this.rules;
    }
    /**
     * Gets the price of the card.
     * @returns The price of the card.
     */
    getPrice() {
        return this.price;
    }
    /**
     * Shows detailed information about the card.
     */
    show() {
        let cardInfo = `ID: ${this.id}
Name: ${this.name}
Mana: ${this.mana}
Line: ${this.line}
Rarity: ${this.rarity}
Rules: ${this.rules}
Price: ${this.price}`;
        if (this.line == Line.PLANESWALKER) {
            cardInfo += `\nLoyalty: ${this.getModifier()}`;
        }
        else if (this.line == Line.CREATURE) {
            cardInfo += `\nStrengh: ${this.getModifier()}`;
        }
        let multiColorInfo = cardInfo.split(/\n/g);
        switch (this.color) {
            case Color.WHITE:
                console.log(chalk.white(cardInfo));
                break;
            case Color.BLUE:
                console.log(chalk.blue(cardInfo));
                break;
            case Color.BLACK:
                console.log(chalk.black(cardInfo));
                break;
            case Color.RED:
                console.log(chalk.red(cardInfo));
                break;
            case Color.GREEN:
                console.log(chalk.green(cardInfo));
                break;
            case Color.COLORLESS:
                console.log(cardInfo);
                break;
            case Color.MULTICOLOR:
                multiColorInfo = multiColorInfo.map((element) => {
                    // Obtener un índice aleatorio para seleccionar un color de la lista
                    const buf = crypto.randomBytes(1);
                    const randomIndex = buf.readUInt8(0) % availableColors.length;
                    // Aplicar el color al elemento
                    return availableColors[randomIndex](element);
                });
                multiColorInfo.forEach((element) => {
                    console.log(element);
                });
                break;
        }
    }
}
