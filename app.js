const Koa = require('koa');
const WebSocket = require('ws');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller.js');

const server = new Koa();

const webSocketServer = new WebSocket.Server({server}, () => console.log('The WebSocket Server already running on: 8030'));

webSocketServer.broadcast = data => {
    for (const client of webSocketServer.clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data, err => console.log(`Server error: ${err}`));
        }
    }
}

webSocketServer.on('connection', ws => {
    console.log(`Server is connected`);
    ws.on('message', mes => {
        console.log(`Message sent by client: ${mes}`);
        const data = {
            message: mes
        }
        webSocketServer.broadcast(JSON.stringify(data))
    })
})

server.use(bodyParser());

server.use(controller());

server.listen(8030);
console.log('server running on 8030...');