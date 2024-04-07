import { CardServerClient } from "./clientManager.js";
import net from 'net';

const cardServerClient = new CardServerClient();
const client = net.connect({port: 60300})

client.on('data', (data) => {
  cardServerClient.generate();
})