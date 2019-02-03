const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || '3000';

server.listen(PORT, (err) => {
    if(err) console.log(err.stack);
    else console.log('server running on port ', PORT);
});