const express = require('express');
const http = require('http');
const cli = require('nodemon/lib/cli');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clientMap = new Map(); 

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Handle incoming location updates
    // const data = JSON.parse(message);
    const data = JSON.parse(message);
    // console.log(`Latitude: ${locationData.latitude}, Longitude: ${locationData.longitude}`);
    
    // Process the received location data as needed

    // console.log(data);
    if (data.type == 'number') {
      const number = data.number;

      // Store client number and WebSocket connection
      clientMap.set(number, ws);
      console.log(clientMap);
      console.log(`Client with number ${number} registered`);
    } else if (data.type === 'message') {
      const targetNumber = data.targetNumber;
      const messageToSend = data.message;

      // Send message to the client with the specific number
      const clientSocket = clientMap.get(targetNumber);
      if (clientSocket && clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(messageToSend);
        // clientSocket.to(targetNumber).emit()
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clientMap.forEach((value, key) => {
      if (value === ws) {
        clientMap.delete(key);
      }
    });
  });
});

// Your other Express routes and middleware
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
