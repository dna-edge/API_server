const mysql = global.utils.mysql;
const redis = global.utils.redis;

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
          resolve(rows);
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
          resolve();
        }
      }
    });
  })
  .then(() => {
    // 2. DB에서 정보 삭제하기
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM posting
                    WHERE (writer_idx = ? AND posting_idx = ?)`;
      mysql.query(sql, [userIdx, postingIdx], (err, rows) => {
          if (err) {
            reject (err);
          } else {
            if (rows.affectedRows === 1) {
              resolve(rows);
            } else {
              reject(42400);
            }
          }
      });
    });
  })
  .then(() => {
    // 3. DB에서 정보 삭제하기
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM posting_likes
                    WHERE (writer_idx = ? AND posting_idx = ?)`;
      mysql.query(sql, [userIdx, postingIdx], (err, rows) => {
          if (err) {
            reject (err);
          } else {
            if (rows.affectedRows !== 0) {
              resolve(rows);
            } else {
              reject(43400);
            }
          }
      });
    });
  });
};

/*******************
 *  Show
 *  @param: postingidx
 ********************/
exports.show = (postingIdx) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT *
                  FROM posting
                  WHERE posting_idx = ?`;

    mysql.query(sql, [postingIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length === 0) {
          reject(44400);
        } else {
          resolve(rows);
        }
      }
    });
  });
};

/*******************
 *  Update posting
 *  @param: useridx, postingidx, pcontents
 ********************/
 exports.update = (userIdx, postingIdx, pcontents) => {
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
           resolve();
         }
       }
     });
   })
   .then(() => {
     // 2. DB에서 정보 수정하기
     return new Promise((resolve, reject) => {
       const sql = `UPDATE posting
                    SET contents = ?
                    WHERE (writer_idx = ? AND posting_idx = ?)`;
       mysql.query(sql, [pcontents, userIdx, postingIdx], (err, rows) => {
           if (err) {
             reject (err);
           } else {
             if (rows.affectedRows === 1) {
               resolve(rows);
             } else {
               reject(45400);
             }
           }
       });
     });
   });
 };

/*******************
 *  like posting
 *  @param: useridx, postingidx, plikes
 ********************/
exports.like = (userIdx, postingIdx, plikes) => {
  // 1. 공감리스트에 있는지 확인하기
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM posting_likes
                  WHERE (posting_idx, user_idx)`;

    mysql.query(sql, [postingIdx, userIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length !== 0) {
          reject(46400);
        } else {
          resolve(true);
        }
      }
    });
  })
  .then(() => {
    // 2. 공감하기
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO posting_likes(posting_idx, user_idx)
                    VALUES (?, ?)`;

      mysql.query(sql, [postingIdx, userIdx], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.affectedRows === 0) {
            reject(47400);
          } else {
            resolve(rows);
          }
        }
      });
    });
  })
  .then(() => {
    // 3. 공감수 수정하기
    return new Promise((resolve, reject) => {
      const sql = `UPDATE posting
                   SET likes_cnt = ?
                   WHERE posting_idx = ?`;
      mysql.query(sql, [plikes+1, postingIdx], (err, rows) => {
          if (err) {
            reject (err);
          } else {
            if (rows.affectedRows === 1) {
              resolve(rows);
            } else {
              reject(48400);
            }
          }
      });
    });
  });
};

/*******************
 *  Unlike posting
 *  @param: useridx, postingidx, plikes
 ********************/
exports.unlike = (userIdx, postingIdx, plikes) => {
  // 1. 공감리스트에 있는지 확인하기
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM posting_likes
                  WHERE (posting_idx, user_idx)`;

    mysql.query(sql, [postingIdx, userIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length === 0) {
          reject(49400);
        } else {
          resolve(true);
        }
      }
    });
  })
  .then(() => {
    // 2. 공감 취소하기
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM posting_likes
                    WHERE posting_idx = ? AND user_idx = ?`;

      mysql.query(sql, [postingIdx, userIdx], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.affectedRows === 0) {
            reject(47400);
          } else {
            resolve(rows);
          }
        }
      });
    });
  })
  .then(() => {
    // 3. 공감수 수정하기
    return new Promise((resolve, reject) => {
      const sql = `UPDATE posting
                   SET likes_cnt = ?
                   WHERE posting_idx = ?`;
      mysql.query(sql, [plikes-1, postingIdx], (err, rows) => {
          if (err) {
            reject (err);
          } else {
            if (rows.affectedRows === 1) {
              resolve(rows);
            } else {
              reject(48400);
            }
          }
      });
    });
  });
};
