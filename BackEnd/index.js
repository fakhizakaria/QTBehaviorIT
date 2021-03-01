require('dotenv').config();
const port = process.env.PORT || 1234;
const mongoose = require('mongoose');
const Target = require('./modals/target');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

// Start our serve.
http.listen(port, () => {
    console.log(`Listening on *: ${port}`);
});

// Simple route to test my server.
app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io from backend server</h1>');
});

// Connection to behavior data base to save history(behavior) of our target.
mongoose.connect(process.env.URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
.then(() => {console.log('Connect to behaviorDB.');})
.catch((err) => console.log('Could not connect to behaviorDB !', err));

// Socket io.
io.on('connection', (socket) => {
  console.log('A new user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('my message', (msg) => {
    console.log('Message: ' + msg);
  });
  // Generate a random Behavior on connection event and save it on Db for history.
  let currentBehavior = new Target();
    currentBehavior = behavior();
    Target.create(currentBehavior, (err, res) => {
        if(err) throw err;
    });
  // Emit a random behavior.
  socket.emit('new-behavior', currentBehavior);
  // Emit the behavior score.
  socket.emit('score-behavior', scoreBehavior);
});

// Target Logic.
function randomOnRange() {
    return Math.random() * (10 - (-10)) + (-10);
};

function randomTime(){
    return Math.random() * (60 - (20)) + (20);
};

function impactPostion() {
    const target = new Target({
        x: randomOnRange().toFixed(1),
        y: randomOnRange().toFixed(1)
    });
    return target;
};
// Generate Behavior.
scoreBehavior = new Target();
var x = 0;
var y = 0;
function behavior() {
    const timeInterval = randomTime();
    const loadBehavior = [];
    do {
        for (let index = 0; index < timeInterval.toFixed(0); index++) {
            currentPosition = new impactPostion();
            loadBehavior.push(currentPosition);
            x = x + currentPosition.x;
            y = y + currentPosition.y;
        }
    } while (timeInterval == '0' && loadBehavior.length() > 0);
    scoreBehavior.x = x.toFixed(1);
    scoreBehavior.y = y.toFixed(1);
    return loadBehavior;
};

