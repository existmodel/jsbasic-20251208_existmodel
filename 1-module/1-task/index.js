function factorial(n) {
  let current = n;
  let value = 1;
  if (n === 0 || n === 1) {
    return 1;
  } else {
    for (let i = 0; i < n; i++) {
      value = value * current;

      current = current - 1;
    }
  }
  return value;
}
