export const CertFindFilter =(certs, certId) => {
  let cert = '';
  cert = certs.find(c => c.docId === certId)
  return(cert)
}