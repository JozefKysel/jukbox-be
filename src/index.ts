import express from 'express';
import router from './router';
import passport from 'passport';
import socketIo from 'socket.io';
import http from 'http';
const PORT = 4000;

const app: express.Application = express();

app
  .use(passport.initialize())
  .use(router);

const server = http.createServer(app);

// process.env.NODE_ENV !== 'test' && server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = socketIo(server);

const nsp = io.of('/codeworks');
nsp.on('connection', socket => {
  socket.on('addSong', data => {
    socket.broadcast.emit('updatedPlaylist', data);
    });
  socket.on('updateSongDiamonds', data => socket.broadcast.emit('updatedPlaylist', data));
});

export default server;

