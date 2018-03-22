// const io = require('socket.io')();
var app = require('express')();
// var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;


// var url = "mongodb://localhost:27017/";
var urls = "mongodb://kbtganesh:magadheera@kbt-cluster-shard-00-00-0gdcv.mongodb.net:27017,kbt-cluster-shard-00-01-0gdcv.mongodb.net:27017,kbt-cluster-shard-00-02-0gdcv.mongodb.net:27017/?replicaSet=kbt-cluster-shard-0&ssl=true";
var mydb;
MongoClient.connect(urls, function(err, db) {
  if (err) throw err;
  console.log("Database created!", db);
  var dbo = db.db('chat-application');
  mydb = dbo;
  dbo.collection('users').find().toArray(function(e, d) {
    console.log("document length: ", d.length);
    // db.close();
    return d;
});
});
function getUsers(){
  return mydb.collection('users').find().toArray();
}
//app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
  }
);

var server = require('http').Server(app);
server.listen(process.env.PORT || 5000); 
var io = require('socket.io')(server);
app.get('/', function (req, res) {
  res.send('hello world')
})
app.get('/users',(req, res)=>{
  getUsers().then((data) => res.send(data));
})
io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
      setInterval(() => {
        client.emit('timer', new Date(),'2nd');
      }, interval);
    });

    client.on('chat message', (id,message) => io.emit('chat message', id, message));
    // io.on()
  });
