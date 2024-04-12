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

  removeFromFile(filePath :string, cardToRemove :CardData) :boolean {
    let refuse = false;
    const directory = `database/${filePath.toLocaleLowerCase()}`;
    const fullPath = `${directory}/${cardToRemove.name}.json`;
    if (!fs.existsSync(directory) || !fs.existsSync(fullPath)) {
      refuse = true;
      return refuse;
    } else {
      try {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const cards :CardData[] = JSON.parse(fileContent);
        // Almacena todas las cartas que no coincidan
        const filteredCards :CardData[] = cards.filter((card) => {
          return card.id !== cardToRemove.id;
        });
        fs.writeFileSync(fullPath, JSON.stringify(filteredCards, null, 2))
      } catch (err) {
        console.error(`'Error al eliminar cartas coincidentes del archivo. Error: ${err.code}, Operacion: ${err.syscall}`);
      }
    }
    return refuse;
  }

  checkIfCardExist(path: string, card: CardData): boolean {
    try {
      const fileContent = fs.readFileSync(path, 'utf-8');
      let currentCards;
      try {
        currentCards = JSON.parse(fileContent);
        // Si el parseo fue exitoso, asumimos que el archivo contiene un array de objetos
        return currentCards.some((currentCard: CardData) => {
          return JSON.stringify(currentCard) === JSON.stringify(card);
        });
      } catch (err) {
        try {
          // Si el parseo como array falla, intentamos parsearlo como un objeto único
          const currentCard = JSON.parse(fileContent);
          // Si el parseo fue exitoso, asumimos que el archivo contiene un solo objeto
          return JSON.stringify(currentCard) === JSON.stringify(card);
        } catch (err) {
          console.error(`'Error al parsear el archivo JSON. Error: ${err.code}, Operacion: ${err.syscall}`);
          return false;
        }
      }
    } catch (err) {
      console.error(`'Error al leer el archivo JSON. Error: ${err.code}, Operacion: ${err.syscall}`);
      return false;
    }
  }
}