import { Card } from "./card.js";
import { FileManager } from "./fileManager.js";

/**
 * CardManager class manages operations related to cards.
 */
export class CardManager {
  private fileName: string;
  private cards: Card[];

  constructor() {}

  /**
   * Sets the file name and reads cards from the file.
   * @param newFileName The new file name to be set.
   */
  setFileName(newFileName: string) {
    this.fileName = newFileName;
    this.cards = FileManager.Instance().read(this.fileName);
  }

  /**
   * Retrieves all cards managed by CardManager.
   * @returns An array of cards.
   */
  getCards() {
    return this.cards;
  }

  /**
   * Gets the amount of cards managed by CardManager.
   * @returns The number of cards.
   */
  getAmountOfCards(): number {
    return this.cards.length;
  }

  /**
   * Checks if a card with a specific ID and owner exists.
   * @param id The ID of the card.
   * @param user The owner of the card.
   * @returns True if the card exists, false otherwise.
   */
  existID(id: number, user: string): boolean {
    let exist = false;
    this.cards.forEach((card) => {
      if (card.getId() == id && card.getCardOwner() == user) {
        exist = true;
      }
    });
    return exist;
  }

  /**
   * Checks if a card exists.
   * @param cd The card to check existence for.
   * @returns True if the card exists, false otherwise.
   */
  exist(cd: Card): boolean {
    let exist = false;
    this.cards.forEach((card) => {
      if (card.getId() == cd.getId()) {
        exist = true;
      }
    });
    return exist;
  }

  /**
   * Adds a new card to the collection.
   * @param card The card to be added.
   * @returns True if the card was added successfully, false otherwise.
   */
  addCard(card: Card) {
    try {
      if (!this.exist(card)) {
        this.cards.push(card);
        FileManager.Instance().write(this.fileName, this.cards, (cardErr, cardData) => {
          if (cardErr) {
            console.log(cardErr);
          } else {
            console.log(`La carta ha sido añadida correctamente: ${cardData}`);
          }
        })
      } else {
        console.log('La carta ya existe.');
      }
    } catch (error) {
      console.log(error);
    }
    // if (!this.exist(card)) {
    //   this.cards.push(card);
    //   FileManager.Instance().write(this.fileName, this.cards, (cardErr, cardData) => {
    //     if (cardErr) {
    //       console.log(cardErr);
    //     } else {
    //       console.log(`La carta ha sido añadida correctamente: ${cardData}`);
    //     }
    //   })
    // } else {
    //   console.log('La carta ya existe.');
    // }
    // if (!this.exist(card)) {
    //   this.cards.push(card);
    //   FileManager.Instance().write(this.fileName, this.cards, (cardErr) => {
        
    //   })
    //   console.log('La carta ha sido añadida correctamente.');
    //   return true;
    // } else {
    //   console.log('No se ha podido añadir la carta.');
    // }
    // return false;
  }

  /**
   * Updates an existing card.
   * @param card The card to be updated.
   * @returns True if the card was updated successfully, false otherwise.
   */
  updateCard(card: Card): boolean {
    if (this.exist(card)) {
      this.remove(card.getCardOwner(), card.getId());
      this.addCard(card);
      console.log('La carta ha sido actualizada correctamente.');
      return true;
    }
    console.log('La carta que intenta actualizar no existe.');
    return false;
  }

  /**
   * Removes a card from the collection.
   * @param user The owner of the card to be removed.
   * @param id The ID of the card to be removed.
   */
  remove(user: string, id: number) {
    const readed = this.existID(id, user);
    if (readed) {
      this.cards.forEach((card, index) => {
        if (card.getCardOwner() == user && card.getId() == id) {
          this.cards.splice(index, 1);
        }
      });
      FileManager.Instance().update(this.fileName, this.cards);
    } else {
      console.log('No se ha encontrado la carta que desea leer.');
    }
  }

  /**
   * Reads a card with specified ID owned by a user.
   * @param user The owner of the card.
   * @param id The ID of the card to be read.
   * @returns True if the card was read successfully, false otherwise.
   */
  read(user: string, id: number): boolean {
    const readed = this.existID(id, user);
    if (readed) {
      this.cards.forEach((card) => {
        if (card.getId() == id && card.getCardOwner() == user) {
          card.show();
        }
      });
    } else {
      console.log('No se ha encontrado la carta que desea leer.');
    }
    console.log(readed);
    return readed;
  }

  /**
   * Lists all cards owned by a user.
   * @param ownUser The owner of the cards to be listed.
   */
  list(ownUser: string) {
    console.log(`${ownUser} collection\n------------------`);
    this.cards.forEach((card) => {
      if (ownUser == card.getCardOwner()) {
        card.show();
        console.log(`------------------`);
      }
    });
  }
}