'use strict';

module.exports = class HttpApplicationResponse {
  constructor(serverResponse) {
    this.serverResponse = serverResponse;
  }

  success(response) {
    if (response) {
      this.serverResponse.setHeader('Content-Type', 'application/json');
      this.serverResponse.end(JSON.stringify(response));

      return;
    }

    this.serverResponse.end();
  }

  internalError(error) {
    console.error('Erro interno', error);
    this.serverResponse.statusCode = 500;
    this.serverResponse.end(error.toString());
  }
};
