export const BookFindFilter =(books, bookId) => {
  let book = '';
  book = books.find(b => b.docId === bookId)
  return(book)
}