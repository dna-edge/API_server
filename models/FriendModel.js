const mysql = global.utils.mysql;
const redis = global.utils.redis;


/*******************
 *  Add
 *  @param: userData = { idx }
 ********************/
exports.add = (userIdx, receiverIdx) => {
  // 1. 친구여부 확인
  return new Promise((resolve, reject) => {
    const sql = `SELECT *
                  FROM friends
                  WHERE (user1_idx = ? AND user2_idx = ?) OR (user1_idx = ? AND user2_idx = ?)`;

    mysql.query(sql, [userIdx, receiverIdx, receiverIdx, userIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length !== 0) {
          reject(30400);
        } else {
          resolve(null);
        }
      }
    });
  })
  .then(() => {
    // 2. DB에 정보 삽입하기
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO friends (user1_idx, user2_idx)
                          VALUES     (?, ?)`;
      mysql.query(sql, [userIdx, receiverIdx], (err, rows) => {
          if (err) {
            reject (err);
          } else {
            if (rows.affectedRows === 1) {
              resolve();
            } else {
              reject(22500);
            }
          }
      });
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT idx, nickname, avatar
                     FROM users
                    WHERE idx = ?`;
      mysql.query(sql, receiverIdx, (err, rows) => {
        if (err) {
          reject (err);
        } else {
          if (rows.length > 0) {
            resolve(rows[0]);
          } else {
            reject(20400);
          }
        }
      });
    });
  });
};

/*******************
 *  Delete
 *  @param: idx
 ********************/
exports.delete = (userIdx,receiverIdx) => {
  // 1. 친구여부 확인
  return new Promise((resolve, reject) => {
    const sql = `SELECT *
                  FROM friends
                  WHERE (user1_idx = ? AND user2_idx = ?) OR (user1_idx = ? AND user2_idx = ?)`;

    mysql.query(sql, [userIdx, receiverIdx, receiverIdx, userIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length === 0) {
          reject(31400);
        } else {
          resolve(null);
        }
      }
    });
  })
  .then(() => {
    // 2. DB에서 정보 삭제하기
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM friends
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
