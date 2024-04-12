import { Card } from "./card.js";
/**
 * CardManager class manages operations related to cards.
 */
export declare class CardManager {
    private fileName;
    private cards;
    constructor();
    /**
     * Sets the file name and reads cards from the file.
     * @param newFileName The new file name to be set.
     */
    setFileName(newFileName: string): void;
    /**
     * Retrieves all cards managed by CardManager.
     * @returns An array of cards.
     */
    getCards(): Card[];
    /**
     * Gets the amount of cards managed by CardManager.
     * @returns The number of cards.
     */
    getAmountOfCards(): number;
    /**
     * Checks if a card with a specific ID and owner exists.
     * @param id The ID of the card.
     * @param user The owner of the card.
     * @returns True if the card exists, false otherwise.
     */
    existID(id: number, user: string): boolean;
    /**
     * Checks if a card exists.
     * @param cd The card to check existence for.
     * @returns True if the card exists, false otherwise.
     */
    exist(cd: Card): boolean;
    /**
     * Adds a new card to the collection.
     * @param card The card to be added.
     * @returns True if the card was added successfully, false otherwise.
     */
    addCard(card: Card): void;
    /**
     * Updates an existing card.
     * @param card The card to be updated.
     * @returns True if the card was updated successfully, false otherwise.
     */
    updateCard(card: Card): boolean;
    /**
     * Removes a card from the collection.
     * @param user The owner of the card to be removed.
     * @param id The ID of the card to be removed.
     */
    remove(user: string, id: number): void;
    /**
     * Reads a card with specified ID owned by a user.
     * @param user The owner of the card.
     * @param id The ID of the card to be read.
     * @returns True if the card was read successfully, false otherwise.
     */
    read(user: string, id: number): boolean;
    /**
     * Lists all cards owned by a user.
     * @param ownUser The owner of the cards to be listed.
     */
    list(ownUser: string): void;
}
