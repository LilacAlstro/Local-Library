function findAuthorById(authors, id) 
{
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) 
{
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) 
{
  let borrowed = books.filter((book) => book.borrows.some((borrow) => borrow.returned === false));
  let returned = books.filter((book) => book.borrows.every((borrow) => borrow.returned === true));
  let result = [[...borrowed], [...returned]];
  return result;
}

function getBorrowersForBook(book, accounts) 
{
  let borrowers = accounts.filter((user) => book.borrows.some((borrow) => user.id === borrow.id));
  let result = borrowers.map((user) => 
  {
    let temp= new Object();
    temp.name = user.name;
    temp.email = user.email;
    temp.returned = book.borrows.find((borrow) => user.id === borrow.id ).returned;
    return temp;
  }
  )
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
