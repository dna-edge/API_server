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
        if (rows.length == 0) {
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
        if (rows.length == 0) {
          reject(32400);
        } else {
          resolve(rows);
        }
      }
    });
  });
};
