const io = require('socket.io')();

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
  io.listen(port);
  console.log('omale',port);
