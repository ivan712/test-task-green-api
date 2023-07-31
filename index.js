const server1 = require('./server1');

server1.listen(3000, () => {
  console.log('server1 is running on http://localhost:3000');
});