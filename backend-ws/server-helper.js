const {staffClients,clients} = require('./server-storage')

const express = require("express");
const httpServer = express();

const ipWhitelist=(req, res, next) =>{
  const allowedIps = ['207.154.216.254','::1'];
  const clientIp = req.connection.remoteAddress || req.headers['x-forwarded-for'];

  if (!clientIp || allowedIps.indexOf(clientIp) !== -1) {
    next();
  } else {
    res.status(403).send('Forbidden: IP address not allowed');
  }
}


httpServer.use(ipWhitelist)
httpServer.get("/clients", (req, res) => {
  const clientsData = Array.from(clients.entries()).map(([username, clientData]) => {
      return { username, ...clientData.user };
  });
  res.json(clientsData);
});
httpServer.get("/staffClients", (req, res) => {
  const staffClientsData = Array.from(staffClients.entries()).map(([username, clientData]) => {
      return { username, ...clientData.user };
  });
  res.json(staffClientsData);
});
httpServer.all('*',(req,res)=>{
    return res.status(404).json({error:`Cant find ${req.originalUrl} on this server.`})
  })

const startHttpServer=() =>{
    const port = process.env.PORT-1;
    httpServer.listen(port, () => {
      console.info(`HTTP: Listening on: localhost:${port}`);
    });
}

module.exports={
    startHttpServer
}