function makeFriendsList(friends) {
  let friendsLines = friends.map(
    (user) => `${user.firstName} ${user.lastName}`,
  );

  let list = document.createElement("ul");
  for (let i = 0; i < friendsLines.length; i++) {
    let item = document.createElement("li");
    item.textContent = friendsLines[i];
    list.append(item);
  }
  return list;
}
