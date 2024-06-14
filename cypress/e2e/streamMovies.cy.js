const { StreamMovieElements } = require("../helpers/StreamMovieElements");
const { login } = require("../helpers/functions/helperFunctions.cy");

const streamMovieElements = new StreamMovieElements();

describe("CT002.001 - Login com credenciais válidas", () => {
  const user = {
    email: "pedrohsp2004@gmail.com",
    password: "teste",
  };

  before(() => {
    cy.clearLocalStorage();
  })

  it("Dado que eu seja um usuário cadastrado", () => {
    cy.log(`Email: ${user.email}, Password: ${user.password}`);
  });

  it("Quando eu acesso a página de login", () => {
    cy.visit("/login");
  });

  it('E preencho o campo "Email" com meu email cadastrado', () => {
    streamMovieElements.loginElements.emailInput().type(user.email);
  });

  it('E preencho o campo "Senha" com minha senha correta', () => {
    streamMovieElements.loginElements.passwordInput().type(user.password);
  });

  it('E clico no botão "Entrar"', () => {
    streamMovieElements.loginElements.buttonLogin().click();
  });

  it("Então o sistema deve me autenticar com sucesso", () => {
    streamMovieElements.homeElements.firstCard().should('be.visible');
  })

  it("E eu devo ser redirecionado para a página inicial da plataforma", () => {
    cy.url().should('eq', 'http://localhost:5173/');
  })
});

describe("CT002.002 - Login com credenciais inválidas", () => {
  const user = {
    email: "emailErrado@gmail.com",
    password: "323213"
  }

  before(() => {
    cy.clearLocalStorage();
  })

  it("Dado que eu seja um usuário cadastrado", () => {
    cy.log(`Email: ${user.email}, Password: ${user.password}`);
    
  })

  it("Quando eu acesso a página de login", () => {
    cy.visit("/login");
  })

  it('E preencho o campo "Email" com um email inválido', () => {
    streamMovieElements.loginElements.emailInput().type(user.email);
  })

  it('E preencho o campo "Senha" com uma senha inválida', () => {
    streamMovieElements.loginElements.passwordInput().type(user.password);
  })

  it('E clico no botão "Entrar"', () => {
    streamMovieElements.loginElements.buttonLogin().click();
  })

  it('Então o sistema deve exibir uma mensagem de erro informando que as credenciais estão incorretas', () => {
    streamMovieElements.loginElements.errorInvalidLoginToast().should('be.visible');
  })

  it('E eu não devo ser autenticado', () => {
    streamMovieElements.homeElements.firstCard().should('not.exist');
  })

  it('E eu devo permanecer na página de login', () => {
    cy.url().should('eq', 'http://localhost:5173/login');
  })
})

describe("CT002.003 - Logout", () => {
  before(() => {
    login();
    cy.visit("/");
  })

  it("Dado que eu esteja logado na plataforma", () => {
    streamMovieElements.homeElements.firstCard().should('be.visible');
  })

  it('Quando: eu clico no botão "Sair"', () => {
    streamMovieElements.homeElements.logoutButton().click();
  })

  it('Então: o sistema deve me deslogar', () => {
    cy.getLocalStorage('user').should('be.null');
  })

  it('E a minha sessão deve ser encerrada', () => {
    streamMovieElements.homeElements.firstCard().should('not.exist');
  })

  it('E a minha sessão deve ser encerrada', () => {
    cy.url().should('eq', 'http://localhost:5173/login');
  })
})


describe("CT002.004 - Acesso a páginas restritas sem login", () => {
  before(() => {
    cy.clearLocalStorage();
    cy.visit("/login");
  })

  it('Dado que eu não esteja logado na plataforma', () => {
    cy.getLocalStorage('user').should('be.null');
  })

  it("Quando eu acesso uma página restrita, como a página incial", () => {
    cy.visit("/");
  })

  it("Então o sistema deve redirecionar para a página de login", () => {
    cy.url().should('eq', 'http://localhost:5173/login');
  })

  it('E o sistema deve exibir uma mensagem informando que é necessário fazer login', () => {
    streamMovieElements.loginElements.errorBlockedLoginToast().should('be.visible');
  })
})

describe("CT003.001 -  Listar filmes por categoria", () => {
  before(() => {
    login();
  })

  it("Dado que eu esteja logado na plataforma", () => {
    cy.getLocalStorage('user').should('not.be.null');
  })

  it("Quando eu acesso a página de filmes", () => {
    cy.visit("/");
  })

  it('E seleciono o gênero "Ação" no filtro de categoria', () => {
    streamMovieElements.homeElements.selectGeneroAcao().click();
  })

  it('E o filtro de gênero deve ser atualizado para "Ação"', () => {
    streamMovieElements.homeElements.selectGeneroAcao().should('have.attr', 'aria-pressed', 'true');  
  })
})


