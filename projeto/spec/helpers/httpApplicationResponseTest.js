'use strict';

module.exports = class HttpApplicationResponseTest {
  constructor() {
    this.reponseObj = null;
    this.hasError = false;
    this.errorMessage = '';
  }

  success(response) {
    if (response) {
      this.reponseObj = response;
    }
  }

  internalError(error) {
    this.hasError = true;
    this.errorMessage = error.toString();
  }
};
