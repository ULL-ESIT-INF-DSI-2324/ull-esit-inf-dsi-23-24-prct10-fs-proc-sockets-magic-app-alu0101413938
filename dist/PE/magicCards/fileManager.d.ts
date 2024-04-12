import { Card } from './card.js';
/**
 * FileManager class handles file operations related to cards.
 */
export declare class FileManager {
    private static instance;
    file: number;
    constructor();
    /**
     * Returns the singleton instance of FileManager.
     */
    static Instance(): FileManager;
    /**
     * Opens the specified file.
     * @param filePath Path to the file to be opened.
     */
    open: (filePath: string, callback: (err: Error | undefined, data: string | undefined) => void) => void;
    /**
     * Reads data from the specified file and returns an array of Card objects.
     * @param filePath Path to the file to be read.
     * @returns An array of Card objects read from the file.
     */
    read(filePath: string): Card[];
    /**
     * Updates the specified file with new card data.
     * @param filePath Path to the file to be updated.
     * @param cards An array of Card objects containing updated data.
     */
    update(filePath: string, cards: Card[]): void;
    /**
     * Writes card data to the specified file.
     * @param filePath Path to the file to write data.
     * @param cards An array of Card objects to be written to the file.
     */
    write: (filePath: string, cards: Card[], callback: (err: string | undefined, data: string | undefined) => void) => void;
}
