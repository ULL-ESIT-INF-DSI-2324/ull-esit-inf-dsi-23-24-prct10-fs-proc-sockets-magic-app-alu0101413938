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

  writeOnFile(filePath :string, card :CardData) :boolean {
    let refuse = false;
    // Permite crear el directorio si no existe
    const directory = `database/${filePath.toLocaleLowerCase()}`;
    const fullPath = `${directory}/${card.id}.json`;
    try {
      if (!fs.existsSync(directory)) fs.mkdirSync(directory, {recursive: true});
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, JSON.stringify(card, null, 2));
      } else {
        refuse = true;
      }
    } catch (err) {
      refuse = true;
      console.error(`Error al escribir datos en el archivo. Error: ${err.code}, Operacion: ${err.syscall}`);
    }
    return refuse
  }

  removeFromFile(filePath: string, idToRemove: number, callback: (refuse: boolean) => void): void {
    let refuse = false;
    const directory = `database/${filePath.toLocaleLowerCase()}`;
    const fullPath = `${directory}/${idToRemove}.json`;
    fs.unlink(fullPath, (err) => {
      if (err) {
        refuse = true;
        console.error(`Error al eliminar cartas coincidentes del archivo. Error: ${err.code}, Operacion: ${err.syscall}`);
      }
      callback(refuse);
    });
  }

}