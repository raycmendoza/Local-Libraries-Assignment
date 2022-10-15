function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}



function getBooksBorrowedCount(books) {
let booksCheckedOut = books.filter((book) =>
book.borrows.filter((booksBorrowed) => booksBorrowed.returned === false).length > 0);
return booksCheckedOut.length;
}

function getMostCommonGenres(books = []) {
  let genresObj = {};
  books.forEach((bookObj) => {
    let currentBookObjGenre = bookObj.genre;
    if (currentBookObjGenre in genresObj) {
      genresObj[currentBookObjGenre] += 1;
    } else {
      genresObj[currentBookObjGenre] = 1;
    }
  })

  let commonGenresArray = Object.keys(genresObj);
  //console.log(commonGenresArray)
  let result = commonGenresArray.map((genre) => {
    return { name: genre, count: genresObj[genre] }
  })
  // console.log(result)
  result.sort((a,b) => (b.count - a.count))
  result = result.slice(0,5)
  return result;
}



//used helper function
function getMostPopularBooksHelper(books = []) {
books.sort((bookA, bookB) => {
  return bookB.borrows.length - bookA.borrows.length
})
return books;
}

function getMostPopularBooks(books) {
  books = getMostPopularBooksHelper(books)
  let result = books.slice(0,5).map((bookObj) => {
    return { name: bookObj.title, count: bookObj.borrows.length }
  })
  return result
}

//used helper function
function helperJoinFirstAndLast(first, last) {
  return `${first} ${last}`
}

function getMostPopularAuthors(books = [], authors = []) {
  let mostPopularBooks = getMostPopularBooksHelper(books);
  let topFiveBooks = mostPopularBooks.slice(0,5);
  let result = topFiveBooks.map((bookObj) => {
    let numAccounts = bookObj.borrows.length;
    let {authorId} = bookObj;
    let foundAuthor = authors.find((authorObj) => {
      return authorObj.id === authorId;
    })
    let fullName = helperJoinFirstAndLast(foundAuthor.name.first, foundAuthor.name.last);
    return { name: fullName, count: numAccounts}
  })
  return result
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
