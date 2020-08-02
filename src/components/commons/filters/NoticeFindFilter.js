export const NoticeFindFilter =(notices, noticeId) => {
  let notice = '';
  notice = notices.find(c => c.docId === noticeId)
  return(notice)
}