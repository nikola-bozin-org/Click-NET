const ip = require('ip');
const express = require('express');
const helmet = require('helmet');
const mongoConnect = require('./mongo-connect')
const router = require('./router')

const app = express();
const port = 9876;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(helmet());
app.use('/api/users',router);

const startServer = async()=>{
  mongoConnect.connect(mongoConnect.connectionLink,()=>{
    app.listen(port,async()=>{
      console.log(`Server listening at ${ip.address()}:${port}`);
    })
  })
}

startServer();

