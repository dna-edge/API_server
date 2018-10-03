const userCtrl = require('../controllers/UserCtrl');
const authCtrl = require('../controllers/AuthCtrl');
const postingCtrl = require('../controllers/PostingCtrl')

module.exports = (router) => {
  router.route('/posting/write')
    .post(authCtrl.auth, postingCtrl.write);                  // 포스팅 글쓰기 삭제

  router.route('/posting/delete')
    .post(authCtrl.auth, postingCtrl.delete);                // 포스팅 삭제

  router.route('/posting/show')
    .post(authCtrl.auth, postingCtrl.show);                // 포스팅 조회

  router.route('/posting/update')
    .post(authCtrl.auth, postingCtrl.update);                 // 포스팅 수정

  router.route('/posting/like')
    .post(authCtrl.auth, postingCtrl.like);                // 포스팅 좋아요

  router.route('/posting/unlike')
    .post(authCtrl.auth, postingCtrl.unlike);              // 포스팅 좋아요취소

  return router;
};
