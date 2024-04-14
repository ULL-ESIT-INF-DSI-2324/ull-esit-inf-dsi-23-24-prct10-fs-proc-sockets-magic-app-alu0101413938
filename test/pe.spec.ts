// import { CardManager } from '../src/PE/magicCards/cardsManager.js'
// import { Card } from '../src/PE/magicCards/card.js'
// import { Color } from '../src/cards/enums/color.js';
// import { Line } from '../src/cards/enums/line.js';
// import { Rarity } from '../src/cards/enums/rarity.js';

// import { expect } from "chai";
// import "mocha";
// import { FileManager } from '../src/PE/magicCards/fileManager.js';

// describe("Asynchronous function magicCards tests", () => {
//   let cardManager :CardManager;
//   beforeEach(() => {
//     cardManager = new CardManager();
//     cardManager.setFileName('./test/database.json')
//   });

//   it("write should add card", (done) => {
//     const card = new Card('larzt', 3, 'human', 20, Color.WHITE, Line.EARTH, Rarity.RARE, 'none', 50)
//     const cards :Card[] = [];
//     cards.push(card);
//     FileManager.Instance().write('./test/database.json', cards, (_, data) => {
//       if (data) {
//         expect(data).to.be.equal('1'); // Numbers of cards in the system
//         done();
//       }
//     });
//   });

//   // it("addcard should provide an error", (done) => {
//   //   const card = new Card('larzt', 3, 'human', 20, Color.WHITE, Line.EARTH, Rarity.RARE, 'none', 50)
//   //   const cards :Card[] = [];
//   //   cards.push(card);
//   //   FileManager.Instance().write("nonPath", cards, (error) => {
//   //     if (error) {
//   //       console.log(error);
//   //       expect(error).to.be.equal(" Error ");
//   //       done();
//   //     } else {
//   //       console.log(error);
//   //       done();
//   //     }
//   //   });
//   // });

//   it("open should provide an error", (done) => {
//     FileManager.Instance().open("nonPath", (error) => {
//       if (error) {
//         console.log(error);
//         expect(error).to.be.equal(" Error ");
//         done();
//       } else {
//         console.log(error);
//         done();
//       }
//     });
//   });

// });