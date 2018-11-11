const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  origins: ['http://localhost:4200'],
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());


server.listen(config.PORT, () => {
  mongoose.connect(
    config.MONGODB_URI
  );
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
  require('./routes/todo')(server);
  console.log(`Server started on port ${config.PORT}`);
});
