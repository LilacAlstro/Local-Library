function getTotalBooksCount(books) 
{
  return books.length;
}

function getTotalAccountsCount(accounts) 
{
  return accounts.length;
}

function getBooksBorrowedCount(books) 
{
  const borrowed = books.filter((book) => book.borrows.some((borrow) => borrow.returned ===false));
  return borrowed.length;
}

function getMostCommonGenres(books) 
{
  let genres = [];
  for (let i = 0; i < books.length; i++)
  {
    let genreCount = {name:books[i].genre,count:1};
    
    if (genres.some((genre) => genre.name === genreCount.name))
    {
      genres.find((genre) => genre.name === genreCount.name).count++;
    }
    else
    {
      genres.push(genreCount);
    }

  }
  genres.sort((genre1, genre2) => genre2.count - genre1.count);
  return genres.slice(0,5);
}

function getMostPopularBooks(books) 
{
  let popular = books.sort((popular1, popular2) => popular2.borrows.length - popular1.borrows.length);
  return popular.map((book) => {return {name:book.title,count:book.borrows.length}}).slice(0,5);  
}

function getMostPopularAuthors(books, authors) 
{
  let popularAuthors = [];
  for (let i = 0; i < books.length; i++)
  {
    let popularAuthorsById = {name: books[i].authorId, count:books[i].borrows.length}

    if (popularAuthors.some((author)=> books[i].authorId === author.name))
    {
      popularAuthors.find((authorById) => books[i].authorId === authorById.name).count += books[i].borrows.length;
    }
    else
    {
      popularAuthors.push(popularAuthorsById)
    }
  }  
  let result = popularAuthors.map((popularAuthor) => 
            {     
    let authorObject = authors.find((author) => author.id === popularAuthor.name);
    let fullName = authorObject.name.first + " " + authorObject.name.last;
    return {name:fullName,count:popularAuthor.count} 
  });
  return result.sort((author1,author2) => author2.count- author1.count).slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
