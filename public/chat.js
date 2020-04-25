// Socket io crea automaticamente una variable global, llamada io
const socket = io();

let message  =   document.getElementById("message");
let username =   document.getElementById("username");
let button   =   document.getElementById("send");
let output   =   document.getElementById("output");
let actions  =   document.getElementById("actions");

button.addEventListener('click', () => {
    const newMessage = {
        username:  username.value,
        message :  message.value
    }
    socket.emit('chat:message', newMessage);
    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', (data) => {
    actions.innerHTML = '';
    output.innerHTML += `
    <p style="display: block">
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on('chat:typing', (data) => {
    actions.innerHTML = `
        <p>
            <em>${data} esta escribiendo...</em>
        </p>
    `
});

// socket.emit, envia a todos los clientes, incluyendo al origen
// socket.broadcast.emit(), envia a todos menos al origen