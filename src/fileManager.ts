import fs from 'fs';
import { CardData } from './card.js';

export class FileManager {
  private static instance: FileManager;

  constructor() {
  }

  public static Instance() {
    if (this.instance == null) {
      this.instance = new FileManager();
    }
    return this.instance;
  }

  writeOnFile(filePath :string, cards :CardData[]) {
    const directory = `database/${filePath.toLocaleLowerCase()}`;
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive :true})
    try {
      cards.forEach((card) => {
        const fullPath = `${directory}/${card.name}.json`;
        fs.writeFileSync(fullPath, JSON.stringify(cards, null, 2));
      })
      console.log("Datos escritos con éxito en el archivo.");
    } catch (err) {
      console.error("Error al escribir datos en el archivo:", err);
    }
  }
}