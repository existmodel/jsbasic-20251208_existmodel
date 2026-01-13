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
    // Если хочешь вернуть готовый элемент <table> с thead и tbody, нужно их вставить внутрь this.elem, а потом вернуть this.elem:
    // создаем таблицу
    // создаем заголовок ряд
    let thead = document.createElement("thead");
    // добавляем ему наполнение
    thead.innerHTML = `<tr><th>Имя</th><th>Возраст</th> <th>Зарплата</th><th >Город</th></tr><th></th>`;
    //добавляем его к таблице
    this.elem.appendChild(thead);

    // создаем тело рядов
    let tbody = document.createElement("tbody");
    // добавляем ему наполнение
    tbody.innerHTML = this.rows
      .map(
        ({ name, age, salary, city }) =>
          `<tr><td>${name}</td><td>${age}</td> <td>${salary}</td><td >${city}</td><td><button>X</button></td></tr>`
      )
      .join("");
    // как то надо все соединить в одно
    this.elem.appendChild(tbody);
    //   вешаем возможность удалять ряд
    this.onClick();
    // готовая таблица
    return this.elem;
  }

  onClick() {
    // вешаем слушатель
    this.elem.addEventListener("click", function (event) {
      // «клик относится к кнопке»
      //   Метод closest:начинает с самого event.target проверяет: «я button?» если нет — поднимается к родителюи так вверх по DOM
      // пока не найдёт элемент, подходящий под CSS-селектор "button"

      let button = event.target.closest("button");
      //   ты проверяешь есть ли кнопка
      // вообще неважно, по чему кликнули — по кнопке или внутри неё
      //   если нет то код дальше не выполняется а возвращается
      if (!button) return;
      //   если код продолжается то мы удаляем нужный ряд
      button.closest("tr").remove();
    });
  }
}
