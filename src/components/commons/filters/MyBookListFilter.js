export const MyBookListFilter =(books, userId, myBook) => {
  let booksRef = []
  books.forEach(book => {
    if (myBook && myBook.length) {
      if (book.userId) {
        if (book.userId === userId && myBook.indexOf(book.docId) !== -1) {
          booksRef.push({
            title: book.title,
            uid: book.docId,
            docId: book.docId,
            group: 'original',
          })
        }
      } else {
        if (myBook.indexOf(book.docId) !== -1) {
          booksRef.push({
            title: book.title,
            uid: book.docId,
            docId: book.docId,
            group: 'default',
          })
        }
      }
    } 
  })
  return(booksRef)
}