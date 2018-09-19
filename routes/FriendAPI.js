const userCtrl = require('../controllers/UserCtrl');
const authCtrl = require('../controllers/AuthCtrl');
const friendCtrl = require('../controllers/FriendCtrl')

module.exports = (router) => {
  router.route('/friends/add')
    .post(authCtrl.auth, friendCtrl.add);                  // 친구추가

  router.route('/friends/delete')
    .post(authCtrl.auth, friendCtrl.delete);             // 친구 삭제

  router.route('/friends/show')
    .post(authCtrl.auth, friendCtrl.show);             // 친구 조회

  return router;
};
