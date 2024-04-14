import { expect } from "chai";
import "mocha";

import { FileManager } from '../src/cards/fileManager.js'
import { Rarity } from "../src/cards/enums/rarity.js";
import { Line } from "../src/cards/enums/line.js";
import { Color } from "../src/cards/enums/color.js";
import { CardData } from "../src/cards/card.js";
import { GenerateResponse } from "../src/server/utils/generateResponse.js"

describe('Creacion de cartas', () => {
  const user1 = "test1"
  it("Deberia añadir una carta al inventario", (done) => {
    const card :CardData = {
      cardOwner :user1, id :1, name :"bolt", mana :10,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().writeOnFile(user1, card, (refuse :boolean) => {
      expect(refuse).to.be.equal(false);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Accepted: bolt.");
      done();
    })
  });

  it("Deberia no poder añadir una carta al inventario", (done) => {
    const card :CardData = {
      cardOwner :user1, id :1, name :"bolt", mana :10,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().writeOnFile(user1, card, (refuse :boolean) => {
      expect(refuse).to.be.equal(true);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Refuse: bolt.");
      done();
    })
  });

  it("Deberia poder mostrar una carta al inventario", (done) => {
    const card :CardData = {
      cardOwner :user1, id :1, name :"bolt", mana :10,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().readFile(user1, card.id, (refuse :boolean) => {
      expect(refuse).to.be.equal(false);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Accepted: bolt.");
      done();
    })
  });

  it("No deberia poder mostrar una carta del inventario no existente", (done) => {
    const card :CardData = {
      cardOwner :user1, id :2, name :"bolt", mana :10,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().readFile(user1, card.id, (refuse :boolean) => {
      expect(refuse).to.be.equal(true);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Refuse: bolt.");
      done();
    })
  });

  it("No deberia poder mostrar una carta de un usuario desconocido", (done) => {
    const nonExistUser = "none"
    const card :CardData = {
      cardOwner :user1, id :2, name :"bolt", mana :10,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().readFile(nonExistUser, card.id, (refuse :boolean) => {
      expect(refuse).to.be.equal(true);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Refuse: bolt.");
      done();
    })
  });

  it("Deberia poder actualizar una carta del inventario", (done) => {
    const card :CardData = {
      cardOwner :user1, id :1, name :"bolt", mana :100,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().updateFile(user1, card, (refuse :boolean) => {
      expect(refuse).to.be.equal(false);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Accepted: bolt.");
      done();
    })
  });

  it("No deberia poder actualizar una carta del inventario no existente", (done) => {
    const card :CardData = {
      cardOwner :user1, id :2, name :"bolt", mana :100,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().updateFile(user1, card, (refuse :boolean) => {
      expect(refuse).to.be.equal(true);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Refuse: bolt.");
      done();
    })
  });

  it("No deberia poder actualizar una carta de un usuario desconocido", (done) => {
    const nonExistUser = "none"
    const card :CardData = {
      cardOwner :user1, id :2, name :"bolt", mana :100,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().updateFile(nonExistUser, card, (refuse :boolean) => {
      expect(refuse).to.be.equal(true);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Refuse: bolt.");
      done();
    })
  });

  it("Deberia poder listar las cartas del inventario", (done) => {
    FileManager.Instance().readMultipleFiles(user1, (refuse :boolean, cards :CardData[] | undefined) => {
      expect(refuse).to.be.equal(false);
      expect(cards?.length).not.to.be.equal(0);
      done();
    })
  });

  it("Deberia poder eliminar una carta del inventario", (done) => {
    const card :CardData = {
      cardOwner :user1, id :1, name :"bolt", mana :100,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().removeFromFile(user1, card.id, (refuse :boolean) => {
      expect(refuse).to.be.equal(false);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Accepted: bolt.");
      done();
    })
  });

  it("No deberia poder eliminar una carta del inventario", (done) => {
    const card :CardData = {
      cardOwner :user1, id :1, name :"bolt", mana :100,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().removeFromFile(user1, card.id, (refuse :boolean) => {
      expect(refuse).to.be.equal(true);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Refuse: bolt.");
      done();
    })
  });

  it("No deberia poder eliminar una carta del inventario de un usuario desconocido", (done) => {
    const nonExistUser = "none"
    const card :CardData = {
      cardOwner :user1, id :1, name :"bolt", mana :100,
      color :Color.GREEN, line :Line.ENCHANTMENT, rarity :Rarity.COMMON,
      rules :"rules", price :5, special :0
    }
    FileManager.Instance().removeFromFile(nonExistUser, card.id, (refuse :boolean) => {
      expect(refuse).to.be.equal(true);
      const response = JSON.parse(GenerateResponse(refuse, card.name))
      expect(response.response).to.be.equal("Refuse: bolt.");
      done();
    })
  });

});
