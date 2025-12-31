function camelize(str) {
  let arr = str.split("");
  let newArr = [];
  for (let name of arr) {
    if (name === "-") {
      let item = arr.indexOf(name);
      arr.splice(item, 1);
      newArr.push(arr[item].toUpperCase());
    } else {
      newArr.push(name);
    }
  }
  return newArr.join("");
}
