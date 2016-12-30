'use strict';

const http = require('http');
const Router = require('routes');
const router = Router(); // eslint-disable-line new-cap
const Promise = require('bluebird');
const queryString = require('query-string');

const HttpApplicationResponse = require('api/httpApplicationResponse');

const PesquisaVaga = require('api/pesquisaVaga');

router.addRoute(
  'GET /', (req, res) => res.success({
    pid: process.pid,
    release: process.release,
    uptime: process.uptime(),
    versions: process.versions
  })
);

router.addRoute(
   'GET /pesquisa/*', (res, params) =>
    new PesquisaVaga().handle(res, params)
);

module.exports = http.createServer((req, res) => {
  const applicationResponse = new HttpApplicationResponse(res);
  const match = router.match(`${req.method} ${req.url}`);

  if (!match) {
    res.statusCode = 404;
    res.statusMessage = 'Rota não encontrada';
    res.end();

    return;
  }
  const params = queryString.parse(match.splats[0]);

  Promise.try(
    () => match.fn(applicationResponse, params)
  ).catch(e => {
    console.error('Erro ao receber requisição', e);
    res.internalError = 500;
    res.end(e);
  });
});
