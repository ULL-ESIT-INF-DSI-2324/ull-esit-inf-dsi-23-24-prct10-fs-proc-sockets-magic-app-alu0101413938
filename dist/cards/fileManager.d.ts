import { CardData } from './card.js';
export declare class FileManager {
    private static instance;
    constructor();
    static Instance(): FileManager;
    writeOnFile(filePath: string, card: CardData): boolean;
    removeFromFile(filePath: string, cardToRemove: CardData): boolean;
    checkIfCardExist(path: string, card: CardData): boolean;
}
