function getMinMax(str) {
  let arr = str.split(" ");
  let numbers = arr.filter((item) => !isNaN(item)).map((item) => +item);
  let resultMinMax = {};
  resultMinMax.min = Math.min(...numbers);
  resultMinMax.max = Math.max(...numbers);

  return resultMinMax;
}
