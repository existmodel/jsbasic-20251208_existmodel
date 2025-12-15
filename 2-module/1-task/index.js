function sumSalary(salaries) {
  var sum = 0;
  var value = 0;
  for (let key in salaries) {
    if ((salaries[key] = null)) {
      return 0;
    }
    if (Number.isFinite(salaries[key])) {
      value = salaries[key];
      sum = sum + value;
    }
  }
  return sum;
}
