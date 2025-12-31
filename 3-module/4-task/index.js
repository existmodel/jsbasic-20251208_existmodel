function showSalary(users, age) {
  let filteredUsers = users.filter((user) => user.age <= age);

  let salaryLines = filteredUsers.map(
    (user) => `${user.name}, ${user.balance}`
  );
  return salaryLines.join("\n");
}
