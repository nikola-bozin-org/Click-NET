const ip = require('ip');
const express = require('express');
const helmet = require('helmet');
const mongoConnect = require('./mongo-connect')
const ticketsRouter = require('./routers/ticketsRouter')
const levelsRouter = require('./routers/levelsRouter')
const usersRouter = require('./routers/usersRouter')
const userRouter = require('./routers/userRouter')
const sessionsRouter = require('./routers/sessionsRouter')
const paymentRouter = require('./routers/paymentsRouter')
const cashRegisterRouter = require('./routers/cashRegisterRouter')

const cors = require('cors');

const server = express();
const port = 9876;

server.use(cors({
  origin: 'http://localhost:3000',
}));
server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 
server.use(helmet());
server.use('/api/',paymentRouter)
server.use('/api/',usersRouter);
server.use('/api',userRouter);
server.use('/api/',sessionsRouter);
server.use('/api/',levelsRouter);
server.use('/api/',ticketsRouter);
server.use('/api/',cashRegisterRouter);

const startServer = async()=>{
  mongoConnect.connect(mongoConnect.connectionLink,()=>{
    server.listen(port,async()=>{
      console.log(`Server listening at ${ip.address()}:${port}`);
      console.warn(`Server should read loged in users from database if using server memory. If server is restarted, previous memory is lost`);
    })
  })
}



startServer();

