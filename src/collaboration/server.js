const express = require('express')
const {Server} = require('socket.io')

const app = express();

app.get('/',(req,res)=>{
    return res.send('<h1>Printa - code editor </h1>');
})

const server = app.listen('8000','0.0.0.0',()=>{
    console.log('Serveur ecoute sur le port 8000');
});


const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('codeChanged',(code)=>{
        console.log('code changed')
        socket.broadcast.emit("codeChanged",code);
    })
});

