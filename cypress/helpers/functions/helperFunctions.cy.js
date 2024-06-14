export const login = () => {
  cy.clearLocalStorage();

  const user = {
    id: "31646264-3532-6436-2d30-6231652d3465",
    cpf: "12345678965",
    fullname: "Pedro Henrique",
    socialname: "pdrhp",
    birthdate: "2004-01-30",
    rg: "3355257",
    cellphone: "61998698433",
    email: "pedrohsp2004@gmail.com",
    password: "teste",
  };

  cy.visit("/login");

  cy.window().then((win) => {
    win.localStorage.setItem('user', JSON.stringify(user));
  })
};
