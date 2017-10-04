$(() => {
  const battleground = $('#battleground');
  for (let row = 0; row < 10; row++) {
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }
    tr.appendTo(battleground);
  }
  $('#generate').click(() => {
    removeAll();
    generateShips(2); generateShips(3); generateShips(3); generateShips(4); generateShips(5);
  });
});
function generateShips(size) {
  const firstCell = 1;
  const lastCell = 9 - size;
  direction = defineDirection();

  var freeFound = false;

  do {
    row = createRandomField(firstCell, lastCell);
    cell = createRandomField(firstCell, lastCell);
    var freeFound = findFreeSpace(size, row, cell, direction);
  } while (!freeFound);

  if (freeFound === true) {
    if (direction === 1) {
      placeShipsVertically(size, row, cell);
    } else {
      placeShipsHorizontally(size, row, cell);
    }
  }
  function defineDirection() {
    return Math.floor(Math.random() * 2) + 1;
  }
  function createRandomField(firstCell, lastCell) {
    return Math.floor(Math.random() * lastCell) + firstCell;
  }
} 
function findFreeSpace(size, row, cell, direction) {
  for (i = 0; i < size + 1; i++) {
    if ($('td[data-r="' + row + '"][data-c="' + cell + '"]').hasClass('water')) {
    } else {
      return false;
    }
    if (direction === 1) row++; else cell++;
  }
  return true;
}
function placeShipsVertically(size, row, cell) {
  for (i = 0; i < size; i++) {
    $('td[data-r="' + row + '"][data-c="' + cell + '"]').removeClass('water').addClass('ship');
    row++;
  }
}
function placeShipsHorizontally(size, row, cell) {
  for (i = 0; i < size; i++) {
    $('td[data-r="' + row + '"][data-c="' + cell + '"]').removeClass('water').addClass('ship');
    cell++;
  }
}
function removeAll() {
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      $('td[data-r="' + i + '"][data-c="' + j + '"]').removeClass('ship').addClass('water');
    }
  }
}