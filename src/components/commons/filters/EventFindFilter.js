export const EventFindFilter =(events, eventId) => {
  let event = '';
  event = events.find(c => c.docId === eventId)
  return(event)
}