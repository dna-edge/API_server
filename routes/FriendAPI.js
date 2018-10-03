const userCtrl = require('../controllers/UserCtrl');
const authCtrl = require('../controllers/AuthCtrl');
const friendCtrl = require('../controllers/FriendCtrl')

module.exports = (router) => {
  router.route('/friends/sendReq')
    .post(authCtrl.auth, friendCtrl.sendReq);                  // 친구요청

  router.route('/friends/accReq')
    .post(authCtrl.auth, friendCtrl.accReq);              // 친구수락(친구추가)

  router.route('/friend_wait/delReq')
    .post(authCtrl.auth, friendCtrl.delReq);              // 친구 요청 삭제

  router.route('/friend_wait/showReqList')
    .post(authCtrl.auth, friendCtrl.showReqList);             // 친구 요청 조회

  router.route('/friend_wait/showWait')
    .post(authCtrl.auth, friendCtrl.showWait);             // 친구 대기여부 조회

  router.route('/friends/delete')
    .post(authCtrl.auth, friendCtrl.delete);                // 친구 삭제

  router.route('/friends/show')
    .post(authCtrl.auth, friendCtrl.show);                // 친구 조회

  return router;
};
