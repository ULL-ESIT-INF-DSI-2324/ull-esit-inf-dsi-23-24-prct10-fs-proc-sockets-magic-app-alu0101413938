import fs from 'fs';
import { Card } from './card.js';
import { CardData } from './interfaces/cardDataAux.js';

/**
 * FileManager class handles file operations related to cards.
 */
export class FileManager {
  private static instance: FileManager;
  file: number;
  constructor() {
  }
  
  /**
   * Returns the singleton instance of FileManager.
   */
  public static Instance() {
    if (this.instance == null) {
      this.instance = new FileManager();
    }
    return this.instance;
  }

  /**
   * Opens the specified file.
   * @param filePath Path to the file to be opened.
   */
  open = (filePath: string, callback :(err :Error | undefined, data :string | undefined) => void) => {
    fs.open(filePath, (error) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, `Opened file: ${filePath}`)
      }
    })
    // try {
    //   this.file = fs.openSync(filePath, 'w+');
    //   console.log('La lectura del fichero se ha realizado correctamente');
    // } catch (error) {
    //   console.log(`Ha surgido un error en la operacion: ${error.syscall}`);
    // }
  }

  /**
   * Reads data from the specified file and returns an array of Card objects.
   * @param filePath Path to the file to be read.
   * @returns An array of Card objects read from the file.
   */
  read(filePath: string): Card[] {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      if (data.trim() === '') {
        console.log("El archivo está vacío.");
        return [];
      }
      const jsonData: CardData[] = JSON.parse(data);
      const cards: Card[] = [];
      jsonData.forEach((item: CardData) => {
        const card = new Card(
          item.cardOwner,
          item.id,
          item.name,
          item.mana,
          item.color,
          item.line,
          item.rarity,
          item.rules,
          item.price,
          item.modifier
        );
        cards.push(card);
      });
      return cards;
    } catch (err) {
      console.error("Error reading data from file:", err);
      return [];
    }
  }

  /**
   * Updates the specified file with new card data.
   * @param filePath Path to the file to be updated.
   * @param cards An array of Card objects containing updated data.
   */
  update(filePath: string, cards: Card[]) {
    try {
      fs.writeFileSync(filePath, '', 'utf8')
      fs.writeFileSync(filePath, JSON.stringify(cards, null, 2), { flag: 'w' })
      console.log("Los datos se haz actualizado del archivo:", filePath);
    } catch (err) {
      console.error("Error al escribir datos en el archivo:", err);
    }
  }

  /**
   * Writes card data to the specified file.
   * @param filePath Path to the file to write data.
   * @param cards An array of Card objects to be written to the file.
   */
  write = (filePath :string, cards: Card[], callback: (err :string | undefined, data :string | undefined) => void) => {
    fs.writeFile(filePath, JSON.stringify(cards, null, 2), {flag: 'w+'}, (err :Error) => {
      if (err) {
        callback(`No se ha podido añadir la carta: ${err.message}`, undefined);
      } else {
        callback(undefined, cards.length.toString());
      }
    })
  }
  // write(filePath: string, cards: Card[]) {
  //   fs.writeFile(filePath, JSON.stringify(cards, null, 2), callback :(err :Error, response) => {
  //     if (err) {
  //       callback(`No se ha podido añadir la carta: ${err.message}`)
  //     }
  //     console.log("Datos escritos con éxito en el archivo:", filePath);
  //   })
  //   try {
  //     // fs.writeFileSync(filePath, JSON.stringify(cards, null, 2));
  //   } catch (err) {
  //     console.error("Error al escribir datos en el archivo:", err);
  //   }
  // }
}
