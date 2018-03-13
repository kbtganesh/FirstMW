// const io = require('socket.io')();
var app = require('express')();
var cors = require('cors');

//app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
  }
);

app.get('/',(req, res)=>{res.send({kbt:'otha'})})
var server = require('https').Server(app);
var io = require('socket.io')(server);
io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
      console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
        console.log('inside setinterval');

        client.emit('timer', new Date(),'2nd');
      }, interval);
    });
    // io.on()
  });

  const port = 8000;
  io.listen(process.env.PORT || port);
  console.log('omale',port);
