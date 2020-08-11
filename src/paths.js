const paths = {
  // sessions
  signin: '/signin',
  signup: '/signup',
  passwordreset: '/passwordreset',
  // 404
  nopagefound: '/404',
  // root
  root: '/',
  // my account
  myaccount: '/myaccount',
  // addmailtoaccount: '/addmail',
  // cert
  certdetail: '/cert/detail/:uid',
  // admin
  // admin cert
  certindex: '/admin/cert/index',
  certedit: '/admin/cert/edit/:uid',
  certedittext: '/admin/cert/edittext/:uid',
  certnew: '/admin/cert/new',
  // admin exam
  examindex: '/admin/exam/index',
  examedit: '/admin/exam/edit/:uid',
  examnew: '/admin/exam/new',
  // admn book
  bookindex: '/admin/book/index',
  booknew: '/admin/book/new',
  bookedit: '/admin/book/edit/:uid',
  // admin user
  userindex: '/admin/user/index',
  useredit: '/admin/user/edit/:uid',
  // paypal
  paypal: '/paypal/:uid',
  // admin notice
  noticeindex: '/admin/notice/index',
  noticenew: '/admin/notice/new',
  noticeedit: '/admin/notice/edit/:uid',
  // notice
  noticelist: '/noticelist', 
  // test
  test: '/test',
};

export default paths;