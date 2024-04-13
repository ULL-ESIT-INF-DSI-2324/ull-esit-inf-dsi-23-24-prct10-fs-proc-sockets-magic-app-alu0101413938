import { CardData } from "../../cards/card.js";

export function GenerateMultiColoredResponses(code: boolean, cards: CardData[]): string {
  let response = "";
  console.log('Generate refuse: ', code);
  if (!code) {
      const jsonObject = {
          type: "response",
          code: "accepted",
          response: JSON.stringify(cards),
          colored: true,
          multiple: true
      };
      response = JSON.stringify(jsonObject) + "\n";
  } else {
      // Si hay un error, generamos una respuesta de rechazo genérica
      response = `{"type": "response", "code": "refuse", "response": "Refuse: Error al procesar las cartas."}\n`;
  }
  return response;
}
