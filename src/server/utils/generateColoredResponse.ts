import { CardData } from "../../cards/card.js";

export function GenerateColoredResponse(code :boolean, card :CardData) :string {
  let response = "";
  console.log('Generate refuse: ', code);
  if (!code) {
    const jsonObject = {
      type: "response",
      code: "accepted",
      response: `${JSON.stringify(card)}`,
      colored : true
    };
    response = JSON.stringify(jsonObject) + "\n";
  } else {
    response = `{"type": "response", "code": "refuse", "response": "Refuse: ${card.id}."}\n`;
  }
  return response;
}