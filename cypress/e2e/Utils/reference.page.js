import { selectors } from "./selectors.json"

export class RefPage {
  constructor(name) {
    this.name = name
    this.elements = selectors
  }

  //methods

  get inputField() {
    return cy.get(this.elements.input_Field)
  }
  get btn() {
    return cy.get(this.elements.button)
  }
  get exitMessageBtn() {
    return cy.get(this.elements.exitMessageButton)
  }
  get exitRestoreBtn() {
    return cy.get(this.elements.exitRestoreButton)
  }

  /**
   * Метод проверки присутсвия определенного текста на странице
   * @param {string} content - строка для поиска
   */
  checkMessage(content) {
    cy.contains(content).should('be.visible')
  }
  checkElementVisible(getter) {
    this[getter].should('be.visible')
  }
  
  /**
   * Метод клика по кнопке, Которая должна содержать опредленный текст
   * @param {string} getter - get - метод элемента
   * @param {string} content - строка для поиска
   * @param {number} index - порядковый индекс проверяемого элемента
   */
  buttonIdentAndClick(getter, content = "", index = 0) {
    this[getter].eq(index).scrollIntoView().contains(content).click()
  }

  /**
   * Метод ввода текста в поле
   * @param {string} text - вводимый текст
   * @param {Number} index - порядковый индекс проверяемого элемента
   *
   */
  typeText(text, index = 0) {
    this.inputField.eq(index).scrollIntoView().clear().type(text)
  }

  /**
   * Метод клика
   * @param {String} getter - get-метод элемента
   * @param {Number} index - порядковый индекс проверяемого элемента
   */
  clickBtn(getter, index = 0) {
    this[getter].eq(index).scrollIntoView().click()
  }
}
