const express = require('express');
const http = require('http');
const { SocketAddress } = require('net');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let players = {};
let choices = {};

io.on('connection', (socket) => {
    console.log('Player connected: ' + socket.id);

    // Handling player joining
    if(Object.keys(players).length < 2) {
        players[socket.id] = { id: socket.id, choice: null };
        socket.emit('playerAssigned', { id: socket.id });
    }

    // Handling player choice
    socket.on('playerChoice', (choice) => {
        choices[socket.id] = choice;

        // If both players have made choice
        if(Object.keys(choices).length == 2){
            io.emit('revealChoices', choices);
            choices = {};
        }
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected: ' + socket.id);
        delete players[socket.id];
        delete choices[socket.id];
    });
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});