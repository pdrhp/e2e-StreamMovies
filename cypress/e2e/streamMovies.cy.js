class StreamMovieElements {
  loginElements = {
    emailInput: () => cy.xpath('//*[@id=":r1:-form-item"]'),
    passwordInput: () => cy.xpath('//*[@id=":r3:-form-item"]'),
    buttonLogin: () => cy.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/form/button'),
    errorToast: () => cy.xpath('/html/body/div/div/div/section/ol[2]/li')
  };
  homeElements = {
    firstCard: () => cy.xpath('//*[@id="root"]/div/div/div/div[2]/div/div[1]')
  }
}

const streamMovieElements = new StreamMovieElements();

describe("CT002.001 - Login com credenciais válidas", () => {
  const user = {
    email: "pedrohsp2004@gmail.com",
    password: "teste",
  };

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
    streamMovieElements.loginElements.errorToast().should('be.visible');
  })

  it('E eu não devo ser autenticado', () => {
    streamMovieElements.homeElements.firstCard().should('not.exist');
  })

  it('E eu devo permanecer na página de login', () => {
    cy.url().should('eq', 'http://localhost:5173/login');
  })


})
