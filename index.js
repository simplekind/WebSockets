const http = require('http');
const port = 3000;
const hostname = '127.0.0.1';
const webSocket = require("websocket").server ;
const clients= new Map();   // HashMap to store clients
const httpServer = http.createServer();  
const webSocketServer = new webSocket({
    "httpServer" : httpServer
}) 
webSocketServer.on('request',(req)=>{
    const tcpConnection = req.accept(null,req.origin,null) ;
    // accepting the request
    tcpConnection.on('open',()=> console.log('Connection is now opened!')) ;
    tcpConnection.on('close',()=> console.log('Connection is now closed!')) ;
    // receiving the message
    tcpConnection.on('message',(msg)=>{
        console.log('Message received!');
        const res = JSON.parse(msg.utf8Data) ;
        console.log(res);
    });
    // creating a client GUID
    const clientId =guid();
    clients.set(clientId,{
        "connection": tcpConnection
    });
    // generating a data to be transfered (payload)
    const dataTransfer = {
        'method':'connect',
        'clientId':clientId
    }       // like a PAYLOAD data which means data to b  transferred
    connection.send(JSON.stringify(dataTransfer));  // sending back response of client saying to connect this clientID
})

httpServer.listen(port,hostname,()=>{
    console.log(`Server started on http://${hostname}:${port}/`);
});

// GUID of 32 charachters 
const guid=()=> {
    const s4=()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);     
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
  }