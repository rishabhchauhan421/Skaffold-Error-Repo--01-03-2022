const express = require("express");
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');


const app = express();
app.use(cors());

app.use(bodyParser.json());

const events = [];

app.post('/events', async (req,res)=>{
    const event = req.body;

    events.push(event);
    
    axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
      console.log(err.message);
    });
    axios.post("http://comments-srv:4001/events", event).catch((err) => {
      console.log(err.message);
    });
    axios.post("http://query-srv:4002/events", event).catch((err) => {
      console.log(err.message);
    });
    axios.post("http://moderation-srv:4003/events", event).catch((err) => {
      console.log(err.message);
  });

  res.send({});
}); 

app.get('/events',async (req,res)=>{
    res.send(events);
})

app.listen(4005,()=>{
    console.log('listening 4005');
}); 