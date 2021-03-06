function findAccountById(accounts, id) 
{
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) 
{
  return accounts.sort((name1, name2) =>name1.name.last.toLowerCase() > name2.name.last.toLowerCase() ? 1 : -1);
}

// revised code below (getTotalNumberOfBorrows)
function getTotalNumberOfBorrows(account, books) 
{
  let borrows = books.reduce((totalBorrows, book) => {
    return totalBorrows + book.borrows.reduce((borrowByAccount, borrowedBook) => 
    {
      return borrowedBook.id === account.id ? borrowByAccount + 1 : borrowByAccount;
    },0
    );
  },0 )
  
   return borrows;
}
//previous code:
  // for (let i = 0; i < books.length; i++)
  // {
  //   for (let x = 0; x < books[i].borrows.length; x++)
  //   {
  //       if (account.id === books[i].borrows[x].id)
  //       {
  //         borrows = borrows + 1;
  //       }
  //   }
  // }

function getBooksPossessedByAccount(account, books, authors) 
{
  let booksBorrowed = books.filter((bookBorrowed) => bookBorrowed.borrows.some((borrow) => borrow.returned === false && borrow.id === account.id));
  let result = booksBorrowed.map((book) => 
  {
    let authorObject = authors.find((author) => author.id === book.authorId);
    book.author = authorObject;
    return book;
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
