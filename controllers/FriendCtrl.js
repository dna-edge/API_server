const validator = require('validator');

const friendModel = require('../models/FriendModel');
const errorCode = require('../utils/error').code;

let validationError = {
  name:'ValidationError',
  errors:{}
};

/*******************
 *  Register
 *  @param: id, password, confirm_password, email, nickname, avatar, description
 *  TODO validation
 *  TODO 이미지 등록
 ********************/
exports.add = async (req, res, next) => {
  /* PARAM */
  const userIdx = req.userData.idx;
  const receiverIdx = req.body.receiverIdx || req.params.receiverIdx;
console.log(receiverIdx)
  /* 1. 유효성 체크하기 */
  let isValid = true;

  if (!userIdx || userIdx === null) {
    isValid = false;
    validationError.errors.userIdx = { message : "userIDX is required" };
  }

  if (!receiverIdx || receiverIdx === null) {
    isValid = false;
    validationError.errors.receiverIdx = { message : "receiverIDX is required" };
  }

  if (!isValid) return res.status(400).json(validationError);
  /* 유효성 체크 끝 */
  let result = '';

  try {
    result = await friendModel.add(userIdx, receiverIdx);
  } catch (err) {
    console.log(err);
    return res.json(errorCode[err]);
  }

  /* 조회 성공 시 */
  const respond = {
    status: 200,
    message : "Add Friend Successfully",
    result
  };
  return res.status(200).json(respond);

};

/*******************
 *  Delete
 *  @param: idx, password, new_password,
 *    confirm_password, nickname, avatar, description
 *  TODO 이미지 등록
 ********************/
exports.delete = async (req, res, next) => {
  /* PARAM */
  const userIdx = req.userData.idx;
  const receiverIdx = req.body.idx || req.params.idx;

  /* 유효성 체크하기 */
  let isValid = true;

  if (!isValid) return res.status(400).json(validationError);
  /* 유효성 체크 끝 */

  let result = '';

  try {
    result = await friendModel.delete(userIdx, receiverIdx);
  } catch (err) {
    console.log(err);
    return res.json(errorCode[err]);
  }

  /* 수정 성공 시 */
  const respond = {
    status: 201,
    message : "Delete Friend Successfully",
    result
  };
  return res.status(201).json(respond);
};
