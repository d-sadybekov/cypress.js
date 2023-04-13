import { RefPage } from "../Utils/reference.page";

describe("Authorization page tests", () => {
  const onePage = new RefPage();
  beforeEach(() => {
    cy.visit(Cypress.env("host1"));
  });

  //1.2 Positive - restore password
  it("1.2 Positive - restore password", () => {
    onePage.buttonClick("btn", 1)``;
    onePage.checkText("Восстановите пароль");
    onePage.typeText("d.sadybekov@yandex.ru", 2);
    onePage.checkElementVisible("exitRestoreBtn");
    onePage.buttonClick("btn", 2);
    onePage.checkText("Успешно отправили пароль на e-mail");
    onePage.checkElementVisible("exitMessageBtn");
  });

  //1.1, 1.3, 1.4, 1.5, 1.6
  [
    [
      "1.1 Positive - correct login(mail)/password",
      ["german@dolnikov.ru", "iLoveqastudio1"],
      "btn",
      "Авторизация прошла успешно",
    ],
    [
      "1.3 Negative - correct login(mail), incorrect password",
      ["german@dolnikov.ru", "iLoveqastudio!"],
      "btn",
      "Такого логина или пароля нет",
    ],
    [
      "1.4 Negative - incorrect login(mail), correct password",
      ["german@do1nikov.ru", "iLoveqastudio1"],
      "btn",
      "Такого логина или пароля нет",
    ],
    [
      "1.5 Negative - incorrect login(mail), correct password",
      ["germandolnikov.ru", "iLoveqastudio1"],
      "btn",
      "Нужно исправить проблему валидации",
    ],
    [
      "1.6 Positive - login to lower case - correct login(mail)/password",
      ["GerMan@Dolnikov.ru", "iLoveqastudio1"],
      "btn",
      "Авторизация прошла успешно",
    ],
  ].forEach((Element) => {
    it(Element[0], () => {
      Element[1].forEach((innerElement, i) => {
        onePage.typeText(innerElement, i);
      });
      onePage.buttonClick(Element[2]);
      onePage.checkText(Element[3]);
      onePage.checkElementVisible("exitMessageBtn");
    });
  });
});
