import { CardData } from './card.js';
export declare class FileManager {
    private static instance;
    constructor();
    static Instance(): FileManager;
    writeOnFile(filePath: string, card: CardData, callback: (refuse: boolean) => void): void;
    removeFromFile(filePath: string, idToRemove: number, callback: (refuse: boolean) => void): void;
    updateFile(filePath: string, card: CardData, callback: (refuse: boolean) => void): void;
    readFile(filePath: string, idToShow: number, callback: (refuse: boolean, showCard: CardData | undefined) => void): void;
    readMultipleFiles(filePath: string, callback: (refuse: boolean, cards: CardData[] | undefined) => void): void;
    pathExist(path: string, callback: (refuse: boolean) => void): void;
    fileExist(path: string, callback: (refuse: boolean) => void): void;
}
