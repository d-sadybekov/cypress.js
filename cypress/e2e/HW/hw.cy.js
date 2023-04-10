import { RefPage } from "../Utils/reference.page"

//cypress.env(baseUrl, "https://login.qa.studio")
describe("Authorization page tests", () => {
  const onePage = new RefPage("AuthorizationPage")

  beforeEach(() => {
    cy.visit(Cypress.env('host1'))
  })
  //1.1 Positive - correct login(mail)/password
  it("Positive - correct login(mail)/password", () => {
    onePage.typeText("german@dolnikov.ru")
    onePage.typeText("iLoveqastudio1", 1)
    onePage.buttonIdentAndClick("btn", "Войти")
    onePage.chekContent("page", "Авторизация прошла успешно")
    cy.get("#exitMessageButton").should("be.visible")
  })
  //1.2 Positive - restore password
  it("Positive - restore password", () => {
    onePage.clickBtn("btn", 1)
    onePage.chekContent("page", "Восстановите пароль")
    onePage.typeText("d.sadybekov@yandex.ru", 2)
    cy.get("#exitRestoreButton").should("be.visible")
    onePage.buttonIdentAndClick("btn", "Отправить код", 2)
    onePage.chekContent("page", "Успешно отправили пароль на e-mail")
    cy.get("#exitMessageButton").should("be.visible")
  })
  //1.3 Negative - correct lgn, incorrect pwd
  it("Negative - correct lgn, incorrect pwd", () => {
    onePage.typeText("german@dolnikov.ru")
    onePage.typeText("iLoveqastudio!", 1)
    onePage.buttonIdentAndClick("btn", "Войти")
    onePage.chekContent("page", "Такого логина или пароля нет")
    cy.get("#exitMessageButton").should("be.visible")
  })
  //1.4 Negative - incorrect lgn, correct pwd
  it("Negative - incorrect lgn, correct pwd", () => {
    onePage.typeText("german@do1nikov.ru")
    onePage.typeText("iLoveqastudio1", 1)
    onePage.buttonIdentAndClick("btn", "Войти")
    onePage.chekContent("page", "Такого логина или пароля нет")
    cy.get("#exitMessageButton").should("be.visible")
  })
  //1.5 Negative - email validation - incorrect lgn, correct pwd
  it("Negative - incorrect lgn, correct pwd", () => {
    onePage.typeText("germandolnikov.ru")
    onePage.typeText("iLoveqastudio1", 1)
    onePage.buttonIdentAndClick("btn", "Войти")
    onePage.chekContent("page", "Нужно исправить проблему валидации")
    cy.get("#exitMessageButton").should("be.visible")
  })
  //1.6 Positive - login to lower case - correct login(mail)/password
  it("Positive - login to lower case - correct login(mail)/password", () => {
    onePage.typeText("GerMan@Dolnikov.ru")
    onePage.typeText("iLoveqastudio1", 1)
    onePage.buttonIdentAndClick("btn", "Войти")
    onePage.chekContent("page", "Авторизация прошла успешно")
    cy.get("#exitMessageButton").should("be.visible")
  })
})
