export const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
        // named pipe
    return val;
  }
  if (port >= 0) {
        // port number
    return port;
  }
  return false;
};


export const onError = function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
