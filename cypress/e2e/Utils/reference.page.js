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

  get exitBtn() {
    return cy.get(this.elements.exitButton)
  }
  /**
   * Метод проверки присутсвия определенного текста в элементе
   * @param {string} getter - get - метод элемента
   * @param {string} content - строка для поиска
   * @param {number} index - порядковый индекс проверяемого элемента
   */
  chekContent(getter, content = "", index = 0) {
    if (getter == "page") {
      cy.contains(content)
    } else {
      this[getter].eq(index).contains(content)
    }
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
