function highlight(table) {
  let cells = table.querySelectorAll("td");
  let lastCells = table.querySelectorAll("tr td:last-child");
  for (let cell of cells) {
    if (cell.textContent === "m") {
      cell.parentElement.classList.add("male");
    } else if (cell.textContent === "f") {
      cell.parentElement.classList.add("female");
    }
    if (cell.textContent < 18) {
      cell.parentElement.style.textDecoration = "line-through";
    }
  }
  for (let lastCell of lastCells) {
    if (!lastCell.hasAttribute("data-available")) {
      lastCell.parentElement.hidden = true;
    } else if (lastCell.getAttribute("data-available") === "true") {
      lastCell.parentElement.classList.add("available");
    } else if (lastCell.getAttribute("data-available") === "false") {
      lastCell.parentElement.classList.add("unavailable");
    }
  }
}
