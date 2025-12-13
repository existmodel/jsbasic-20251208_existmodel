/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  if (name === null || name === undefined || name === "") {
    return false;
  } else if (name.match(" ") !== null) {
    // если нет пробелов то вернется null если есть пробелы то вернет массив совпадений
    return false;
  } else if (name.length < 4) {
    return false;
  } else {
    return true;
  }
}

function sayHello() {
  let userName = prompt("Введите ваше имя");

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print("Некорректное имя");
  }
}
