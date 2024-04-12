import { Color } from "./enums/color.js";
import { Line } from "./enums/line.js";
import { Rarity } from "./enums/rarity.js";

export interface CardData {
  cardOwner: string;
  id: number;
  name: string;
  mana: number;
  color: Color;
  line: Line;
  rarity: Rarity;
  rules: string;
  price: number;
  special: number;
}