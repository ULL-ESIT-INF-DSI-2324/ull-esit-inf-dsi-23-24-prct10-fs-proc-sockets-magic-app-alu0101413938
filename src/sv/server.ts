import net from 'net';

net.createServer((connection) => {
  console.log('A client has connected.');

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });

}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
})