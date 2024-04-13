export function GenerateColoredResponse(code, card) {
    let response = "";
    console.log('Generate refuse: ', code);
    if (!code) {
        const jsonObject = {
            type: "response",
            code: "accepted",
            response: `${JSON.stringify(card)}`,
            colored: true
        };
        response = JSON.stringify(jsonObject) + "\n";
    }
    else {
        response = `{"type": "response", "code": "refuse", "response": "Refuse: ${card.id}."}\n`;
    }
    return response;
}
