'use strict';

const docs = eval(require('../json/vagas')).docs;

for (let i = 0; i < docs.length; i++) {
  docs[i].texto =
  `${docs[i].title.toLowerCase()} ${docs[i].description.toLowerCase()}`;
  docs[i].cidades = docs[i].cidade.join(',').toLowerCase();
}

module.exports = class PesquisaVagaApi {
  constructor() {
    this.retorno = [];
    this.itens = 1000000;
    this.pula = 1;
    this.indiceInicio = 0;
  }

  // parametros opcionais
  // :cidade
  // :texto
  // :ordem ->
  //            1 asc
  //           -1 desc

  // paginação
  // :itensPagina
  // :pagina [1..n]

  handle(response, params) {// eslint-disable-line max-statements

    // Verifica e prepara tamanho da página
    if (params.itensPagina) {
      this.itens = params.itensPagina - 1;
    }

    // Prepara registro inicial da paginação
    this.pula = ((params.pagina || 1) - 1) * this.itens;

    // Verifica se tem filtro
    const temFiltro = params.cidade || params.texto;

    if (temFiltro) {
      // Verifica se o filtro é por cidade se sim limpa espaços e
      // tranforma em minusculo (case insensitive)
      if (params.cidade) {
        params.cidade = params.cidade.trim().toLowerCase();
      }
      // Verifica se o filtro é por titulo e descricao se sim limpa
      // espaços e tranforma em minusculo (case insensitive)
      if (params.texto) {
        params.texto = params.texto.trim().toLowerCase();
      }

      this.filtrar(params);
    } else {
      this.retorno = docs;
    }

    if (params.ordem) {
      this.ordenar(params);
    } else if (!temFiltro && params.itensPagina) {
      this.paginar();
    }

    response.success(this.retorno.map(function(a) {
      return {
        title: a.title,
        description: a.description,
        salario: a.salario,
        cidade: a.cidade,
        cidadeFormated: a.cidadeFormated
      };
    }));
  }

  filtrar(params) {
    let addCidade;
    let addTexto;
    let indice = 0;

    while (docs.length > indice &&
    (params.ordem || this.retorno.length <= this.itens)) {
      const item = docs[indice];

      // Aplica filtro sobre a cidade
      addCidade = !params.cidade ||
          item.cidades.indexOf(params.cidade) > -1;
      // Aplica filtro sobre o titulo e a descrição
      addTexto = !params.texto ||
          item.texto.indexOf(params.texto) > -1;

      // Verifica se atende o filtro
      if (addCidade && addTexto) {
        this.adicionarItem(params, item);
      }
      indice++;
    }
  }

  // Adiciona itens ao retorno
  adicionarItem(params, item) {
    if (params.ordem) {
      this.retorno.push(item);
    } else {
      if (this.indiceInicio >= this.pula) {
        this.retorno.push(item);
      }
      this.indiceInicio++;
    }
  }

  // Ordena os dados
  ordenar(params) {
    const compara = function(a, b) {
      if (a.salario < b.salario) {
        return params.ordem * -1;
      }
      if (a.salario > b.salario) {
        return params.ordem * 1;
      }

      return 0;
    };

    this.retorno.sort(compara);

    if (params.itensPagina) {
      this.paginar();
    }
  }

  // Pagina os itens
  paginar() {
    this.retorno = this.retorno.splice(this.pula, this.itens + 1);
  }
};
