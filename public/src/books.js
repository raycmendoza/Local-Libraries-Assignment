function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id);
  return found;
}

function findBookById(books, id) {
  let foundBooks = books.find((book) => book.id === id);
  return foundBooks;
}

function partitionBooksByBorrowedStatus(books) {
  let booksReturned = books.filter((book) =>
  book.borrows.every((borrow) => borrow.returned === true));
  
  let booksBorrowed = books.filter((book) =>
  book.borrows.some((borrow) => borrow.returned === false));

  let finalArray = [[...booksBorrowed], [...booksReturned]];
  return finalArray;
}

// created function getBorrowersForBook taking in 2 parameters 1) book object & 2) accounts array
// use map() to look through borrows array of book object
// use find() method within map() to loop through accounts array
// pass in an anonymous func as the callback func which takes in each amount and finds the account where acccount.is === borrow.id
// return spread op containing output values
// use slice on output array to return first 10
function getBorrowersForBook(book, accounts) {
  return book.borrows
  .map((borrow) => {
    let account = accounts.find((account) => account.id === borrow.id);
    return { ...borrow, ...account };
  })
  .slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
