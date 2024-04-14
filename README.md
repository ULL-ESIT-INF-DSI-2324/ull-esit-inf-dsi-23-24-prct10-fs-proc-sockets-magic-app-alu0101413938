[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7bX30zK4)
<p align="center">
<a href='https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-alu0101413938?branch=main'><img src='https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-alu0101413938/badge.svg?branch=main' alt='Coverage Status' /></a>
</p>
# Aplicación cliente-servidor para coleccionistas de cartas Magic

## Introduccion
El propósito de esta práctica es diseñar e implementar un sistema **cliente-servidor** que sirva como base para la gestión de inventario de cartas de Magic: The Gathering. El cliente enviará peticiones al servidor relacionadas con la gestión de inventario, como la adición, eliminación o modificación de cartas, y el servidor se encargará de procesar estas solicitudes de manera eficiente y segura.

Este ejercicio no solo nos permitirá entender el funcionamiento de la arquitectura **cliente-servidor**, sino que también nos sumergirá en el emocionante mundo de la programación de aplicaciones distribuidas. A lo largo de esta práctica, exploraremos conceptos clave como la comunicación entre procesos, la gestión de solicitudes concurrentes y la seguridad en la transmisión de datos.

El objetivo final es desarrollar un sistema robusto y escalable que pueda satisfacer las necesidades de gestión de inventario de cartas de Magic: The Gathering, brindando a los usuarios una experiencia fluida y eficiente en la administración de su colección de cartas.

## Servidor
El servidor es el encargado de gestionar las peticiones por parte del cliente. Este procesa dicha peticion para determinar una respuesta que será enviada al cliente. Para ello utilizamos un evento ***request*** el cual gestiona las diferentes peticiones por parte del cliente.
```ts
connection.on('request', (message) => {
    let response = "";
    switch (message._[0]) {
      case "add":
        console.log("Se ha solicitado la creacion de una carta");
        connection.emit('create', message, (refuse :boolean) => {
          console.log('Emit Add refuse:', refuse);
          response = GenerateResponse(refuse, `Add card with name: ${message.name}`);          
          connection.write(response);  
        })
        break;
      case "remove":
        console.log("Se ha solicitado la eliminacion de una carta");
        connection.emit('remove', message, (refuse :boolean) => {
          console.log('Emit Remove refuse:', refuse);
          response = GenerateResponse(refuse, `Remove card with id: ${message.id}`);
          connection.write(response);
        })
        break;
      case "update":
        console.log("Se ha solicitado la actualizacion de una carta");
        connection.emit('update', message, (refuse :boolean) => {
          console.log('Emit Update refuse:', refuse);
          response = GenerateResponse(refuse, `Update card with id: ${message.id}`);
          connection.write(response);
        })
        break;
      case "show":
        console.log("Se ha solicitado mostrar una carta");
        connection.emit('show', message, (refuse :boolean, showCard :CardData | undefined) => {
          console.log('Emit Show refuse:', refuse);
          if (showCard) {
            response = GenerateColoredResponse(refuse, showCard);
          } else {
            response = GenerateResponse(refuse, `Update card with id: ${message.id}`);
          }
          connection.write(response);
        })
        break;
      
      case "list":
        console.log("Se ha solicitado mostrar las cartas de un usuario");
        connection.emit('list', message, (refuse :boolean, showCard :CardData[] | undefined) => {
          console.log('Emit List refuse:', refuse);
          if (showCard) {
            response = GenerateMultiColoredResponses(refuse, showCard);
          } else {
            response = GenerateResponse(refuse, `Update card with id: ${message.id}`);
          }
          connection.write(response);
        })
        break;

      default:
        console.log("La peticion no se ha podido procesar.");
        response = GenerateResponse(true, `The request could not be processed.`);
        connection.write(response);
        break;
    }
  })
```

## Cliente
El cliente es el encargado de realizar una peticion al servidor. El cliente genera un "input" por linea de comandos y lo envia al servidor. Cuando el cliente recibe la respuesta por parte del servidor obtendra un mensaje dicho mensaje sera ***aceptado*** o ***rechazado*** mostrandose en verde y rojo respectivamente. Una vez se haya terminado la peticion el cliente se desconectara.
```ts
  client.on('response', (message) => {   
    if (message.code == "accepted") {
      if (message.colored) {
        if (message.multiple) {
          const cards: CardData[] = JSON.parse(message.response);
          client.emit('multiple', cards);
        } else {
          const card = JSON.parse(message.response)
          client.emit('colored', card);
        }
      } else {
        console.log(chalk.green(message.response));
      }
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