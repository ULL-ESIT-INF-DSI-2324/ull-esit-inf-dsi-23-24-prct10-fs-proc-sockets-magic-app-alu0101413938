export function GenerateResponse(code :boolean, cardName :string) :string {
  let response = ""; 
  if (!code) {
    response = `{"type": "response", "code": "accepted", "response": "Accepted: ${cardName}."}\n`;
  } else {
    response = `{"type": "response", "code": "refuse", "response": "Refuse: ${cardName}."}\n`;
  }
  return response;
}