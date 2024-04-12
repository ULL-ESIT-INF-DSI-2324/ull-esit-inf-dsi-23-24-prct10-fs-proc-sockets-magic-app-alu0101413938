[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7bX30zK4)

# Aplicación cliente-servidor para coleccionistas de cartas Magic
## Introduccion
## Servidor
El servidor es el encargado de gestionar las peticiones por parte del cliente. Este procesa dicha peticion para determinar una respuesta que será enviada al cliente. Para ello utilizamos un evento ***request*** el cual gestiona las diferentes peticiones por parte del cliente.
```ts
  connection.on('request', (message) => {
    let response = "";
    switch (message._[0]) {
      case "add":
        console.log("Se ha solicitado la creacion de una carta");
        connection.emit('create', message, (refuse :boolean) => {
          response = GenerateResponse(refuse, `Add card with name: ${message.name}`)
        })
        break;
      case "remove":
        console.log("Se ha solicitado la eliminacion de una carta");
        connection.emit('remove', message, (refuse :boolean) => {
          response = GenerateResponse(refuse, `Remove card with id: ${message.id}`)
        })
        break;
      default:
        break;
    }
    connection.write(response);
  })
```
## Cliente
El cliente es el encargado de realizar una peticion al servidor. El cliente genera un "input" por linea de comandos y lo envia al servidor. Cuando el cliente recibe la respuesta por parte del servidor obtendra un mensaje dicho mensaje sera ***aceptado*** o ***rechazado*** mostrandose en verde y rojo respectivamente. Una vez se haya terminado la peticion el cliente se desconectara.
```ts
  client.on('response', (message) => {
    // console.log(`Respuesta recibida por parte del servidor: ${message}`);
    if (message.code == "accepted") {
      console.log(chalk.green(message.response));
    } else {
      console.log(chalk.red(message.response));
    }
    client.emit('end');
  }) 
```
## Funcionalidades de la aplicacion
La aplicacion cuenta con diferentes funcionalidades:
- ADD: Permite agregar una carta al inventario de un usuario
- UPDATE: Permite actualizar una carta del inventario
- REMOVE: Permite eliminar una carta del inventario
- SHOW: Permite mostrar una carta del inventario
- LIST: Permite mostrar el inventario