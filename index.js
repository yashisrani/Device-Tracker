const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')
const path = require('path')

const server = http.createServer(app)

const io = socketio(server)

io.on('connection',(socket)=>{
    socket.on('send-location',(location)=>{
        io.emit('new-location',{id:socket.id, ...location})
    })
    console.log("connected",socket);

    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id)
    })
})



app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")))

app.get('/', (req,res)=>{
    res.render("index")
})

server.listen(3000)