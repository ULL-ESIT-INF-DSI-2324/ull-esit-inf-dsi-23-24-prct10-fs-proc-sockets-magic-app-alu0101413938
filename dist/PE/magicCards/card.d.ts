import { Color } from "./enums/color.js";
import { Line } from "./enums/line.js";
import { Rarity } from "./enums/rarity.js";
import { Printable } from "./interfaces/printable.js";
/**
 * Card class represents a single card.
 */
export declare class Card implements Printable {
    private cardOwner;
    private id;
    private name;
    private mana;
    private color;
    private line;
    private rarity;
    private rules;
    private price;
    private modifier?;
    constructor(cardOwner: string, id: number, name: string, mana: number, color: Color, line: Line, rarity: Rarity, rules: string, price: number, modifier?: number | undefined);
    /**
     * Gets the modifier of the card.
     * @returns The modifier of the card.
     */
    getModifier(): number;
    /**
     * Gets the owner of the card.
     * @returns The owner of the card.
     */
    getCardOwner(): string;
    /**
     * Gets the ID of the card.
     * @returns The ID of the card.
     */
    getId(): number;
    /**
     * Gets the name of the card.
     * @returns The name of the card.
     */
    getName(): string;
    /**
     * Gets the mana cost of the card.
     * @returns The mana cost of the card.
     */
    getMana(): number;
    /**
     * Gets the color of the card.
     * @returns The color of the card.
     */
    getColor(): Color;
    /**
     * Gets the line of the card.
     * @returns The line of the card.
     */
    getLine(): Line;
    /**
     * Gets the rarity of the card.
     * @returns The rarity of the card.
     */
    getRarity(): Rarity;
    /**
     * Gets the rules of the card.
     * @returns The rules of the card.
     */
    getRules(): string;
    /**
     * Gets the price of the card.
     * @returns The price of the card.
     */
    getPrice(): number;
    /**
     * Shows detailed information about the card.
     */
    show(): void;
}
