const express = require('express');
const http = require('http');
// const cli = require('nodemon/lib/cli');
// const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

let clientMap = new Map(); 

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (message) => {
//     console.log(`Received: ${message}`);

//     // Handle incoming location updates
//     // const data = JSON.parse(message);
//     const data = JSON.parse(message);
//     // console.log(`Latitude: ${locationData.latitude}, Longitude: ${locationData.longitude}`);
    
//     // Process the received location data as needed

//     // console.log(data);
//     if (data.type == 'number') {
//       const number = data.number;

//       // Store client number and WebSocket connection
//       clientMap.set(number, ws);
//       console.log(clientMap);
//       console.log(`Client with number ${number} registered`);
//     }  
//       const targetNumber = data.targetNumber;
//       const messageToSend = data.message;

//       // Send message to the client with the specific number
//       const clientSocket = clientMap.get(targetNumber);
//       if (clientSocket && clientSocket.readyState === WebSocket.OPEN) {
//         clientSocket.send(messageToSend);

//         console.log("Sent to",targetNumber);
//         // clientSocket.to(targetNumber).emit()
      
//     }
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//     clientMap.forEach((value, key) => {
//       if (value === ws) {
//         clientMap.delete(key);
//       }
//     });
//   });
// });

// Your other Express routes and middleware
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



const WebSocket = require('ws');

const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
  console.log('New client connected');

  ws.on('message', function incoming(data) {
    console.log('Received from client: %s', data);
    // console.log(data.toString());
    const message = JSON.parse(data);

    console.log(message);
    console.log(message.targetNumber);
    // console.log(message.type==="message");


    if(message.type == "number"){
      const number = message.number;
       console.log("Hrere")

            // Store client number and WebSocket connection
            clientMap.set(number, ws);
            console.log("registered");
            // console.log(clientMap);
    }
    else if(message.type==="message"){

      console.log("Will you come")
      // number=message.targetNumber;
      const number = message.targetNumber;
      
      // Broadcast the received message to all connected clients
      // wss.clients.forEach(function each(client) {
        const client = clientMap.get(number);
        // console.log(client);
        
        //       console.log("Client:", client);
        // console.log("WS:", ws);
        // console.log("Client Ready State:", client.readyState);
        
        // if (client !== ws && client.readyState === WebSocket.OPEN) {
          if (client && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
            console.log("sent")
          }
          else{
            console.log("Not Connected")
          }
        }else{
          console.log("rendum illa")
        }
    // });
  });
});
