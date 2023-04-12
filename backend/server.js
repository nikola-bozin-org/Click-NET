const ip = require('ip');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
// const hpp = require('hpp')

const mongoConnect = require('./mongo-connect')
const ticketsRouter = require('./routers/ticketsRouter')
const levelsRouter = require('./routers/levelsRouter')
const usersRouter = require('./routers/usersRouter')
const userRouter = require('./routers/userRouter')
const sessionsRouter = require('./routers/sessionsRouter')
const paymentRouter = require('./routers/paymentsRouter')
const cashRegisterRouter = require('./routers/cashRegisterRouter')
const reportsRouter = require('./routers/reportsGeneratorRouter');
const utilsRouter = require('./routers/utilsRouter')

const dropDatabaseRouter = require('./routers/other/dropDatabaseRouter')
const dummyRouter = require('./routers/other/dummyRouter');
const checkIfViewer = require('./helpers/viewerMiddleware');



const server = express();
const port = 9876;

server.use(helmet());
server.use(cors());
server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 
server.use(mongoSanitize());
server.use(xss());
// server.use(hpp());
server.use(checkIfViewer)
server.use('/api/users',usersRouter);
server.use('/api/session',sessionsRouter);
server.use('/api/tickets',ticketsRouter);
server.use('/api/levels',levelsRouter);
server.use('/api/user',userRouter);
server.use('/api/payments',paymentRouter)
server.use('/api/cashRegister',cashRegisterRouter);
server.use('/api/reportsGenerator',reportsRouter);
server.use('/api/utils',utilsRouter)

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

