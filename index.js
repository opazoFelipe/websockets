require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('port', process.env.SERVER_PORT || 3000);

// Middlewares
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Static Files
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

const SocketIO = require('socket.io');

// Require un servidor inicializado
const io = SocketIO(server);

// Websockets
// Metodo para atender nuevas conexiones de clientes
io.on('connection', (socket) => {

    console.log(`new connection, socket id: ${socket.id}`);

    socket.on('chat:message', (data) => {
        // Reenvia los datos recibidos a todos los clientes conectados, incluyendo el que ha enviado el mensaje
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
        console.log(data);
    });
});

// on: Escuchar al cliente
// emit: responder o enviar al cliente
// a traves del socket se escucha o se envian eventos entre el servidor y el cliente