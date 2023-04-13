import { RefPage } from "../Utils/reference.page"

describe("Authorization page tests", () => {
  const onePage = new RefPage("AuthorizationPage")

  beforeEach(() => {
    cy.visit(Cypress.env("host1"))
  })

  //1.2 Positive - restore password
  it("1.2 Positive - restore password", () => {
    onePage.buttonIdentAndClick("btn","Забыли пароль?", 1)
    onePage.checkMessage("Восстановите пароль")
    onePage.typeText("d.sadybekov@yandex.ru", 2)
    onePage.checkElementVisible("exitRestoreBtn")
    onePage.buttonIdentAndClick("btn", "Отправить код", 2)
    onePage.checkMessage("Успешно отправили пароль на e-mail")
    onePage.checkElementVisible("exitMessageBtn")
  });
  
  //1.1, 1.3, 1.4, 1.5, 1.6
   [
        ["1.1 Positive - correct login(mail)/password",[["german@dolnikov.ru", 0],["iLoveqastudio1", 1]],"btn","Войти", "Авторизация прошла успешно"],
        ["1.3 Negative - correct login(mail), incorrect password",[["german@dolnikov.ru", 0],["iLoveqastudio!", 1]],"btn", "Войти", "Такого логина или пароля нет"],
        ["1.4 Negative - incorrect login(mail), correct password",[["german@do1nikov.ru", 0],["iLoveqastudio1", 1]],"btn", "Войти", "Такого логина или пароля нет"],
        ["1.5 Negative - incorrect login(mail), correct password",[["germandolnikov.ru", 0],["iLoveqastudio1", 1]],"btn", "Войти", "Нужно исправить проблему валидации"],
        ["1.6 Positive - login to lower case - correct login(mail)/password",[["GerMan@Dolnikov.ru", 0],["iLoveqastudio1", 1]],"btn", "Войти", "Авторизация прошла успешно"]
    ].forEach(Element => {   it(Element[0], () => {
        Element[1].forEach((innerElement) => {
        onePage.typeText(innerElement[0], innerElement[1])
      })
      onePage.buttonIdentAndClick(Element[2], Element[3], 0)
      onePage.checkMessage(Element[4])
      onePage.checkElementVisible("exitMessageBtn")
    })
  })
})
