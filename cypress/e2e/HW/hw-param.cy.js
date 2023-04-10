import { RefPage } from "../Utils/reference.page"

describe("Authorization page tests", () => {
  const onePage = new RefPage("AuthorizationPage")

  beforeEach(() => {
    cy.visit(Cypress.env("host1"))
  })

  //1.2 Positive - restore password
  it("1.2 Positive - restore password", () => {
    onePage.buttonIdentAndClick("btn","Забыли пароль?", 1)
    onePage.chekContent("page", "Восстановите пароль")
    onePage.typeText("d.sadybekov@yandex.ru", 2)
    cy.get("#exitRestoreButton").should("be.visible")
    onePage.buttonIdentAndClick("btn", "Отправить код", 2)
    onePage.chekContent("page", "Успешно отправили пароль на e-mail")
    cy.get("#exitMessageButton").should("be.visible")
  })
  
  //1.1, 1.3, 1.4, 1.5, 1.6
    const ElementsArray=[
        ["1.1 Positive - correct login(mail)/password",[{itm:"german@dolnikov.ru",indx:0},{itm:"iLoveqastudio1",indx:1}],"btn","Войти", "page", "Авторизация прошла успешно"],
        ["1.3 Negative - correct login(mail), incorrect password",[{itm:"german@dolnikov.ru", indx:0},{itm:"iLoveqastudio!",indx:1}],"btn", "Войти", "page", "Такого логина или пароля нет"],
        ["1.4 Negative - incorrect login(mail), correct password",[{itm:"german@do1nikov.ru", indx:0},{itm:"iLoveqastudio1",indx:1}],"btn", "Войти", "page", "Такого логина или пароля нет"],
        ["1.5 Negative - incorrect login(mail), correct password",[{itm:"germandolnikov.ru", indx:0},{itm:"iLoveqastudio1",indx:1}],"btn", "Войти", "page", "Нужно исправить проблему валидации"],
        ["1.6 Positive - login to lower case - correct login(mail)/password",[{itm:"GerMan@Dolnikov.ru",indx:0},{itm:"iLoveqastudio1",indx: 1}],"btn", "Войти", "page", "Авторизация прошла успешно"]
    ]
    ElementsArray.forEach(Element => {
    it(Element[0], () => {
        const innerElementsArray =Element[1]
        innerElementsArray.forEach((innerElement) => {
        onePage.typeText(innerElement.itm, innerElement.indx)
      })
      onePage.buttonIdentAndClick(Element[2], Element[3], 0)
      onePage.chekContent(Element[4], Element[5], 0)
      cy.get("#exitMessageButton").should("be.visible")
    })
  })
})
