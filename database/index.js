const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors())

server.get("/data",(req, res)=>{
    res.send("Hello")
})

server.listen(8080, ()=>{

})