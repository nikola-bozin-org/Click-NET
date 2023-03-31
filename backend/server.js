const ip = require('ip');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const mongoConnect = require('./mongo-connect')
const ticketsRouter = require('./routers/ticketsRouter')
const levelsRouter = require('./routers/levelsRouter')
const usersRouter = require('./routers/usersRouter')
const userRouter = require('./routers/userRouter')
const sessionsRouter = require('./routers/sessionsRouter')
const paymentRouter = require('./routers/paymentsRouter')
const cashRegisterRouter = require('./routers/cashRegisterRouter')

const dropDatabaseRouter = require('./routers/other/dropDatabaseRouter')
const dummyRouter = require('./routers/other/dummyRouter')



const server = express();
const port = 9876;

server.use(cors({
  // origin: 'http://localhost:3000',
}));
server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 
server.use(helmet());
server.use('/api/users',usersRouter);
server.use('/api/session',sessionsRouter);
server.use('/api/tickets',ticketsRouter);
server.use('/api/levels',levelsRouter);
server.use('/api/user',userRouter);
server.use('/api/payments',paymentRouter)
server.use('/api/cashRegister',cashRegisterRouter);


server.use('/api/',dropDatabaseRouter);
server.use('/api/',dummyRouter);
server.all('*',(req,res)=>{
  res.status(404).json({error:`Cant find ${req.originalUrl} on this server.`})
})


const startServer = async()=>{
  mongoConnect.connect(mongoConnect.connectionLink,()=>{
    server.listen(port,async()=>{
      console.log(`Server listening at ${ip.address()}:${port}`);
    })
  })
}



startServer();

