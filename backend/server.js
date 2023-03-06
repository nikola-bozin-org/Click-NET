const ip = require('ip');
const express = require('express');
const helmet = require('helmet');
const mongoConnect = require('./mongo-connect')
const router = require('./router')
const cors = require('cors');

const server = express();
const port = 9876;

server.use(cors({
  origin: 'http://localhost:3000',
}));
server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 
server.use(helmet());
server.use('/api/users',router);


const startServer = async()=>{
  mongoConnect.connect(mongoConnect.connectionLink,()=>{
    server.listen(port,async()=>{
      console.log(`Server listening at ${ip.address()}:${port}`);
    })
  })
}

startServer();

