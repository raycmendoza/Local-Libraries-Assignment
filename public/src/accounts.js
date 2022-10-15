

function findAccountById(accounts, id) {
  let foundId = accounts.find((account) => account.id === id);
  return foundId;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const {id} = account  //destructure account to id
  let total = books.reduce((total, book) =>{ /// ???? .reduce
   let borrowed = book.borrows.some((borrowsObj) => { ///creat borrow var from borrows array 
     return borrowsObj.id === id ///compare book.borrows.id to account.id 
   })
   if (borrowed){ //if borrowed returns a truthy output
     total++ // increase total count by 1
   }
   return total
  },0) ///???? extra parameter
  return total
 }


function getBooksPossessedByAccount(account = {}, books = [], authors = {}){
  const {id} = account
let booksOnAccount = books.filter((bookObj) => {
  let recentBorrower = bookObj.borrows[0]
  if (recentBorrower.returned === false && recentBorrower.id === id){
    const {authorId} = bookObj
    let foundAuthorObj = authors.find((authorObj) =>{
      return authorObj.id === authorId
    })
    bookObj.author = foundAuthorObj
    return bookObj
  }
})
return booksOnAccount
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
