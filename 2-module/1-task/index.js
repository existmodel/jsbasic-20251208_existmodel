function sumSalary(salaries) {
  var sum = 0;
  for (let key in salaries) {
    if (Number.isFinite(salaries[key])) {
      sum = sum + salaries[key];
    }
  }
  return sum;
}
