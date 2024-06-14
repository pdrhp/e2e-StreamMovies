export class StreamMovieElements {
  loginElements = {
    emailInput: () => cy.xpath('//*[@id=":r1:-form-item"]'),
    passwordInput: () => cy.xpath('//*[@id=":r3:-form-item"]'),
    buttonLogin: () =>
      cy.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/form/button'),
    errorInvalidLoginToast: () => cy.xpath("/html/body/div/div/div/section/ol[2]/li"),
    errorBlockedLoginToast: () => cy.xpath('/html/body/div/div/div/section/ol[2]/li')
  };
  homeElements = {
    firstCard: () => cy.xpath('//*[@id="root"]/div/div/div/div[2]/div/div[1]'),
    logoutButton: () => cy.xpath('//*[@id="root"]/div/div/div/div[1]/div/div[2]/button[3]'),
    selectGeneroAcao: () => cy.xpath('/html/body/div/div/div/div/div[2]/div/div[1]/button[1]')
  };
}

