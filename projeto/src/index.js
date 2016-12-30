'use strict';

const DEFAULT_PORT = 3000;

if (!process.env.PORT) {
  require('dotenv/config');
}

const port = process.env.PORT || DEFAULT_PORT;

console.error('Listening on %s', port); // eslint-disable-line

require('api').listen(port);
