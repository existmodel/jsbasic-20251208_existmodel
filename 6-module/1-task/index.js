/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }

  render() {
    this.elem = document.createElement("table");
    let thead = document.createElement("thead");
    thead.innerHTML = `<tr><th>Имя</th><th>Возраст</th> <th>Зарплата</th><th >Город</th></tr><th></th>`;
    this.elem.appendChild(thead);
    let tbody = document.createElement("tbody");
    tbody.innerHTML = this.rows
      .map(
        ({ name, age, salary, city }) =>
          `<tr><td>${name}</td><td>${age}</td> <td>${salary}</td><td >${city}</td><td><button>X</button></td></tr>`,
      )
      .join("");
    this.elem.appendChild(tbody);
    this.onClick();
    return this.elem;
  }

  onClick() {
    this.elem.addEventListener("click", function (event) {
      let button = event.target.closest("button");
      if (!button) {
        return;
      }
      button.closest("tr").remove();
    });
  }
}
