function ucFirst(str) {
  if (str === "" || str == null) {
    return "";
  } else if (str.match(" ") == null) {
    return (str = str[0].toUpperCase() + str.slice(1));
  }
}
