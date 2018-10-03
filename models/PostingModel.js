const mysql = global.utils.mysql;
const redis = global.utils.redis;

// 만들어야 할 기능 : 글쓰기, 글수정, 글삭제, 글조회, 글좋아요
/*******************
 *  Write
 *  @param: useridx, userLoc, date, pcontents
 ********************/
exports.write = (userIdx, userLoc, date, pcontents) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO posting (writer_idx, location, posting_date, contents)
                        VALUES     (?, ?, ?, ?)`;

    mysql.query(sql, [userIdx, userLoc, date, pcontents], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.affectedRows === 1) {
          resolve();
        } else {
          reject(40400);
        }
      }
    });
  });
};

/*******************
 *  Delete
 *  @param: userIdx, postingIdx
 ********************/
exports.delete = (userIdx, postingIdx) => {
  // 1. 작성자여부 확인
  return new Promise((resolve, reject) => {
    const sql = `SELECT *
                  FROM posting
                  WHERE (writer_idx = ? AND posting_idx = ?)`;

    mysql.query(sql, [userIdx, postingIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length === 0) {
          reject(41400);
        } else {
          resolve(null);
        }
      }
    });
  })
  .then(() => {
    // 2. DB에서 정보 삭제하기
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM posting
                    WHERE (user1_idx = ? AND user2_idx = ?) OR (user1_idx = ? AND user2_idx = ?)`;
      mysql.query(sql, [userIdx, receiverIdx, receiverIdx, userIdx], (err, rows) => {
          if (err) {
            reject (err);
          } else {
            if (rows.affectedRows === 1) {
              resolve(rows);
            } else {
              reject(22500);
            }
          }
      });
    });
  });
};

/*******************
 *  Show
 *  @param: idx
 ********************/
exports.show = (userIdx) => {
  // 1. 친구여부 확인
  return new Promise((resolve, reject) => {
    const sql = `SELECT *
                  FROM friends
                  WHERE user1_idx = ? OR user2_idx = ?`;

    mysql.query(sql, [userIdx, userIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length === 0) {
          reject(32400);
        } else {
          resolve(rows);
        }
      }
    });
  });
};

/*******************
 *  Show req list
 *  @param: userData = { idx }
 ********************/
 exports.showReqList = (userIdx) => {
   // 1. 친구여부 확인
   return new Promise((resolve, reject) => {
     const sql = `SELECT *
                   FROM friend_wait
                   WHERE sender_idx = ? OR receiver_idx = ?`;

     mysql.query(sql, [userIdx, userIdx], (err, rows) => {
       if (err) {
         reject(err);
       } else {
         if (rows.length === 0) {
           reject(33400);
         } else {
           resolve(rows);
         }
       }
     });
   });
 };

/*******************
 *  Delete req
 *  @param: idx
 ********************/
exports.deleteReq = (userIdx,receiverIdx) => {
  // 1. 요청여부 확인
  return new Promise((resolve, reject) => {
    const sql = `SELECT *
                  FROM friend_wait
                  WHERE (sender_idx = ? AND receiver_idx = ?) OR (sender_idx = ? AND receiver_idx = ?)`;

    mysql.query(sql, [userIdx, receiverIdx, receiverIdx, userIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length === 0) {
          reject(33400);
        } else {
          resolve(null);
        }
      }
    });
  })
  .then(() => {
    // 2. DB에서 정보 삭제하기
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM friend_wait
                    WHERE (sender_idx = ? AND receiver_idx = ?) OR (sender_idx = ? AND receiver_idx = ?)`;
      mysql.query(sql, [userIdx, receiverIdx, receiverIdx, userIdx], (err, rows) => {
          if (err) {
            reject (err);
          } else {
            if (rows.affectedRows === 1) {
              resolve(rows);
            } else {
              reject(22500);
            }
          }
      });
    });
  });
};

/*******************
 *  Add req
 *  @param: idx
 ********************/
 exports.addReq = (userIdx,receiverIdx) => {
   // 1. 요청여부 확인
   return new Promise((resolve, reject) => {
     const sql = `SELECT *
                   FROM friend_wait
                   WHERE (sender_idx = ? AND receiver_idx = ?) OR (sender_idx = ? AND receiver_idx = ?)`;

     mysql.query(sql, [userIdx, receiverIdx, receiverIdx, userIdx], (err, rows) => {
       if (err) {
         reject(err);
       } else {
         if (rows.length !== 0) {
           reject(34400);
         } else {
           resolve(null);
         }
       }
     });
   })
   .then(() => {
     // 2. DB에 정보 추가하기
     return new Promise((resolve, reject) => {
       const sql = `INSERT INTO friend_wait (sender_idx, receiver_idx)
                           VALUES     (?, ?)`;
       mysql.query(sql, [userIdx, receiverIdx], (err, rows) => {
           if (err) {
             reject (err);
           } else {
             if (rows.affectedRows === 1) {
               resolve(rows);
             } else {
               reject(22500);
             }
           }
       });
     });
   });
 };

 /*******************
  *  show wait
  *  @param: idx
  ********************/
 exports.showWait = (userIdx, receiverIdx) => {
   // 1. 친구대기상태인지 확인
   return new Promise((resolve, reject) => {
     const sql = `SELECT *
                   FROM friend_wait
                   WHERE (sender_idx = ? AND receiver_idx = ?) OR (sender_idx = ? AND receiver_idx = ?)`;

     mysql.query(sql, [userIdx, receiverIdx, receiverIdx, userIdx], (err, rows) => {
       if (err) {
         reject(err);
       } else {
         if (rows.length === 0) {
           reject(33400);
         } else {
           resolve(null);
         }
       }
     });
   });
 };
