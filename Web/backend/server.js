const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 3000})
var MongoClient = require('mongodb').MongoClient
const dbURI = "mongodb+srv://igl:DiMnAP@web.fxam0su.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(dbURI)
const mongoose = require('mongoose')
const User = require('./model')

const express = require('express');
const Focus = require('./model');
const moment = require('moment');
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send(this.objects.id)
  console.log(this.objects.id)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log('connection to db'))
.catch((err) => console.log(err));

//generate client id
wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on("connection", ws => {

    ws.id = wss.getUniqueID();
    wss.clients.forEach(function each(client) {
        console.log('Client.ID: ' + client.id);
    });

    ws.on('close', () => {
        console.log("Client has disconnected")
    })

    ws.on("message", data => {
        const dataParsed = JSON.parse(data)
        let date_ob = new Date();
        console.log(date_ob)

        async function run() {
            try {
                const database = client.db('insertDB'); 
                const testData = database.collection('testData');
        
                let focus = new Focus({
                    clientId: ws.id,
                    elementId: dataParsed.id,
                    srcElement: dataParsed.srcElement,
                    timeStamp: dataParsed.timeStamp,
                    type: dataParsed.type,
                    siteName: dataParsed.siteName,
                    date: date_ob.toISOString(), 
                    browser: dataParsed.browser,
                    clientX: dataParsed.clientX,
                    clientY: dataParsed.clientY,
                    height: dataParsed.height,
                    width: dataParsed.width,
                    key: dataParsed.key, 
                    scroll: dataParsed.scroll, 
                    click: dataParsed.click, 
                    session: dataParsed.session
                })

                console.log(focus)
        
                const result = await testData.insertOne(focus)
                console.log(`A document was inserted with the _id: ${result.insertedId}`);
        
                } finally {
            }
          }
          run().catch(console.dir);
    })
});