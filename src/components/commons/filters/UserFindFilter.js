export const UserFindFilter =(users, userId) => {
  let user = '';
  user = users.find(u => u.docId === userId)
  return(user)
}