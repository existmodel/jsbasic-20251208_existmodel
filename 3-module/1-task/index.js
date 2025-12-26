function namify(users) {
  let arr = [];
  users.map(function (user) {
    for (let key in user) {
      if (key === "name") {
        arr.push(user.name);
      }
    }
  });
  return arr;
}
