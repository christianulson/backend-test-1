'use strict';

/* eslint-disable max-nested-callbacks, max-statments */

const PesquisaVaga = require('../src/api/pesquisaVaga');
const Response = require('./helpers/httpApplicationResponseTest');

describe('PesquisaVaga', () => {
  describe('Filtrar texto', () => {
    describe('Texto: "Analista"', () => {
      const res = new Response();
      const params = {
        texto: 'Analista'
      };

      new PesquisaVaga().handle(res, params);

      it('Deve retonar 79 registros', () => {
        expect(res.reponseObj.length).to.eql(79);
      });
      it('Deve retonar "Analista de Suporte Pleno - Nível 3"', () => {
        expect(res.reponseObj[78].title).to.eql('Analista de Suporte Pleno - Nível 3');
      });
    });
    it('Deve retonar filtro por texto: "sigilo"', () => {
      const res = new Response();
      const params = {
        texto: 'sigilo'
      };

      new PesquisaVaga().handle(res, params);

        // Verify
      expect(res.reponseObj.length).to.eql(2);
    });
    it('Deve retonar filtro por texto: "Analista de Sucesso do Cliente"', () => {
      const res = new Response();
      const params = {
        texto: 'Analista de Sucesso do Cliente'
      };

      new PesquisaVaga().handle(res, params);

        // Verify
      expect(res.reponseObj.length).to.eql(1);
    });
    it('Deve retonar filtro por texto: "675ruf87"', () => {
      const res = new Response();
      const params = {
        texto: '675ruf87'
      };

      new PesquisaVaga().handle(res, params);
      expect(res.reponseObj.length).to.eql(0);
    });
    it('Deve retonar filtro por texto: ""', () => {
      const res = new Response();
      const params = {
        texto: ''
      };

      new PesquisaVaga().handle(res, params);
      expect(res.reponseObj.length).to.eql(1200);
    });
  });
  describe('Filtrar cidade', () => {
    it('Deve retonar filtro por cidade: "Blumenau"', () => {
      const res = new Response();
      const params = {
        cidade: 'Blumenau'
      };

      new PesquisaVaga().handle(res, params);

        // Verify
      expect(res.reponseObj.length).to.eql(35);
    });
  });

  describe('Filtrar texto + cidade', () => {
    it('Deve retonar filtro por texto: "Repositor" + cidade: "Blumenau"', () => {
      const res = new Response();
      const params = {
        texto: 'Repositor',
        cidade: 'Blumenau'
      };

      new PesquisaVaga().handle(res, params);

      // Verify
      expect(res.reponseObj.length).to.eql(2);
    });
    describe('Ordenar texto + cidade + salário', () => {
      it('Deve retonar filtro por texto: "Repositor" + cidade: "Blumenau" ordenado por salário asc', () => {
        const res = new Response();
        const params = {
          texto: 'Repositor',
          cidade: 'Blumenau',
          ordem: 1
        };

        new PesquisaVaga().handle(res, params);

        // Verify
        expect(res.reponseObj[0].salario).to.eql(1070);
      });

      it('Deve retonar filtro por texto: "Repositor" + cidade: "Blumenau" ordenado por salário desc', () => {
        const res = new Response();
        const params = {
          texto: 'Repositor',
          cidade: 'Blumenau',
          ordem: -1
        };

        new PesquisaVaga().handle(res, params);

        // Verify
        expect(res.reponseObj[0].salario).to.be.eql(1500);
      });
    });
  });

  describe('Ordenar salário', () => {
    it('Deve retonar ordenado por salário asc', () => {
      const res = new Response();
      const params = {
        ordem: 1
      };

      new PesquisaVaga().handle(res, params);

        // Verify
      expect(res.reponseObj[0].salario).to.eql(750);
    });

    it('Deve retonar ordenado por salário desc', () => {
      const res = new Response();
      const params = {
        ordem: -1
      };

      new PesquisaVaga().handle(res, params);

        // Verify
      expect(res.reponseObj[0].salario).to.be.eql(11000);
    });
  });
  describe('Paginação', () => {
    describe('Filtrar texto', () => {
      it('Deve retonar filtro por texto: "Analista"', () => {
        const res = new Response();
        const params = {
          texto: 'Analista',
          pagina: 2,
          itensPagina: 3
        };

        new PesquisaVaga().handle(res, params);

        it('Deve retonar "Estágio na área de Risco de Crédito"', () => {
          // Verify
          expect(res.reponseObj.length).to.eql(3);
        });

        it('Deve retonar "Estágio na área de Risco de Crédito"', () => {
          // Verify
          expect(res.reponseObj[1].title).to.eql('Estágio na área de Risco de Crédito');
        });
      });
      it('Deve retonar filtro por texto: "sigilo"', () => {
        const res = new Response();
        const params = {
          texto: 'sigilo',
          pagina: 1,
          itensPagina: 3
        };

        new PesquisaVaga().handle(res, params);

          // Verify
        expect(res.reponseObj.length).to.eql(2);
      });
      it('Deve retonar filtro por texto: "Analista de Sucesso do Cliente"', () => {
        const res = new Response();
        const params = {
          texto: 'Analista de Sucesso do Cliente',
          pagina: 1,
          itensPagina: 3
        };

        new PesquisaVaga().handle(res, params);

          // Verify
        expect(res.reponseObj[0].salario).to.eql(2000);
      });
    });
    describe('Filtrar cidade', () => {
      it('Deve retonar filtro por cidade: "Blumenau"', () => {
        const res = new Response();
        const params = {
          cidade: 'Blumenau',
          pagina: 1,
          itensPagina: 3
        };

        new PesquisaVaga().handle(res, params);

          // Verify
        expect(res.reponseObj.length).to.eql(3);
      });
    });

    describe('Filtrar texto + cidade', () => {
      it('Deve retonar filtro por texto: "Repositor" + cidade: "Blumenau"', () => {
        const res = new Response();
        const params = {
          texto: 'Repositor',
          cidade: 'Blumenau',
          pagina: 1,
          itensPagina: 3
        };

        new PesquisaVaga().handle(res, params);

        // Verify
        expect(res.reponseObj.length).to.eql(2);
      });
      describe('Ordenar texto + cidade + salário', () => {
        it('Deve retonar filtro por texto: "Repositor" + cidade: "Blumenau" ordenado por salário asc', () => {
          const res = new Response();
          const params = {
            texto: 'Repositor',
            cidade: 'Blumenau',
            ordem: 1,
            pagina: 1,
            itensPagina: 3
          };

          new PesquisaVaga().handle(res, params);

          // Verify
          expect(res.reponseObj[0].salario).to.eql(1070);
        });

        it('Deve retonar filtro por texto: "Repositor" + cidade: "Blumenau" ordenado por salário desc', () => {
          const res = new Response();
          const params = {
            texto: 'Repositor',
            cidade: 'Blumenau',
            ordem: -1,
            pagina: 1,
            itensPagina: 3
          };

          new PesquisaVaga().handle(res, params);

          // Verify
          expect(res.reponseObj[0].salario).to.be.eql(1500);
        });
      });
    });

    describe('Ordenar salário', () => {
      it('Deve retonar ordenado por salário asc', () => {
        const res = new Response();
        const params = {
          ordem: 1,
          pagina: 1,
          itensPagina: 3
        };

        new PesquisaVaga().handle(res, params);

          // Verify
        expect(res.reponseObj[0].salario).to.eql(750);
      });

      it('Deve retonar ordenado por salário desc', () => {
        const res = new Response();
        const params = {
          ordem: -1,
          pagina: 1,
          itensPagina: 3
        };

        new PesquisaVaga().handle(res, params);

          // Verify
        expect(res.reponseObj[0].salario).to.be.eql(11000);
      });
    });
  });
});
