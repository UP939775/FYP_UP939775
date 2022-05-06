import express from 'express'; 
import http from 'http';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app)
const io = new Server(server)


import * as db from "./Database/database.js" 

app.use(express.static('client', { extensions: ['html'] }));
server.listen(8080, () => {
  console.log('Server Running')
});
app.use(express.json());

io.on('connection', socket => {
  let currentValue;
  socket.on('checkbox', (result) => {
    io.emit('change',  result);
    db.storeAvailibility(result);
  })
})

app.get('/locations', async (req, res) => {
    res.json(await db.getAllParkLocation());
})

app.get('/get-park/:id', async (req, res) => {
  const result = await db.searchPark(req.params.id);
  if (!result) {
    res.status(404).send(`This location cannot be found. Please return to the home page`);
    return;
  }
  res.json(result);
  });
app.get('/get-facilities/:id', async (req, res) => {

  const result = await db.getParkFacilities(req.params.id);
  if (!result) {
    res.status(404).send(`This location cannot be found. Please return to the home page`);
    return;
  }
  res.json(result);
});

app.get('/get-facility-availibility/:id', async (req, res) => {
  const result = await db.facility_availibility(req.params.id);
  if (!result) {
    res.status(404).send(`This location cannot be found. Please return to the home page`);
    return;
  }
  res.json(result);
});

app.get('/test-data', async (req, res) => {
  const result = await db.testData();
  res.json(result)
})
