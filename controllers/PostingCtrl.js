const validator = require('validator');
var fetch = require("node-fetch");

const postingModel = require('../models/PostingModel');
const errorCode = require('../utils/error').code;

let validationError = {
  name:'ValidationError',
  errors:{}
};

/*******************
 *  Write
 *  @param: useridx, loc, date, contents
 *  TODO write posting
 *  TODO 포스팅 글쓰기
 ********************/
exports.write = async (req, res, next) => {
  /* PARAM */
  const userIdx = req.userData.idx;
  const userLoc = req.body.userLoc || req.params.userLoc;
  const date = req.body.date || req.params.date;
  const pcontents = req.body.pcontents || req.params.pcontents;
  /* 1. 유효성 체크하기 */
  let isValid = true;

  if (!userIdx || userIdx === null) {
    isValid = false;
    validationError.errors.userIdx = { message : "userIDX is required" };
  }

  if (!userLoc || userLoc === null) {
    isValid = false;
    validationError.errors.userLoc= { message : "userLOC is required" };
  }

  if (!pcontents || pcontents === null) {
    isValid = false;
    validationError.errors.pcontents = { message : "pconetnt is required" };
  }

  if (!isValid) return res.status(400).json(validationError);
  /* 유효성 체크 끝 */
  let result = '';

  try {
    result = await postingModel.write(userIdx, userLoc, date, pcontents);
  } catch (err) {
    console.log(err);
    return res.json(errorCode[err]);
  }
  const respond = {
    status: 201,
    message : "Write Posting Successfully",
    result
  };
  return res.status(201).json(respond);

};

/*******************
 *  Delete
 *  @param: useridx, postingidx
 *  TODO delete posting
 *  TODO 포스팅삭제
 ********************/
exports.delete = async (req, res, next) => {
  /* PARAM */
  const userIdx = req.userData.idx;
  const postingIdx = req.body.postingIdx || req.params.postingIdx;
  /* 유효성 체크하기 */
  let isValid = true;

  if (!userIdx || userIdx === null) {
    isValid = false;
    validationError.errors.userIdx = { message : "userIDX is required" };
  }

  if (!postingIdx || postingIdx === null) {
    isValid = false;
    validationError.errors.postingIdx = { message : "postingIDX is required" };
  }

  if (!isValid) return res.status(400).json(validationError);
  /* 유효성 체크 끝 */

  let result = '';

  try {
    result = await postingModel.delete(userIdx, postingIdx);
  } catch (err) {
    console.log(err);
    return res.json(errorCode[err]);
  }

  /* 삭제 성공 시 */
  const respond = {
    status: 201,
    message : "Delete Posting Successfully",
    result
  };
  return res.status(201).json(respond);
};

/*******************
 *  Show
 *  @param: postingidx
 *  TODO show posting
 *  TODO 포스팅 조회
 ********************/
exports.show = async (req, res, next) => {
  /* PARAM */
  const postingIdx = req.body.postingIdx || req.params.postingIdx;

  /* 유효성 체크하기 */
  let isValid = true;

  if (!postingIdx || postingIdx === null) {
    isValid = false;
    validationError.errors.postingIdx = { message : "postingIDX is required" };
  }
  if (!isValid) return res.status(400).json(validationError);
  /* 유효성 체크 끝 */

  let result = '';

  try {
    result = await postingModel.show(postingIdx);
  } catch (err) {
    console.log(err);
    return res.json(errorCode[err]);
  }

  /* 조회 성공 시 */
  const respond = {
    status: 200,
    message : "Show Posting Successfully",
    result
  };
  return res.status(200).json(respond);
};

/*******************
 *  Alter
 *  @param: useridx, pstingidx, pcontents
 *  TODO alter posting
 *  TODO 포스팅 수정
 ********************/
exports.alter = async (req, res, next) => {
  /* PARAM */
  const userIdx = req.userData.idx;
  const postingIdx = req.body.postingIdx || req.params.postingIdx;
  const pcontents = req.body.pcontents || req.params.pcontents;
  /* 1. 유효성 체크하기 */
  let isValid = true;

  if (!userIdx || userIdx === null) {
    isValid = false;
    validationError.errors.userIdx = { message : "userIDX is required" };
  }

  if (!postingIdx || postingIdx === null) {
    isValid = false;
    validationError.errors.postingIdx = { message : "postingIDX is required" };
  }

  if (!pcontents || pcontents === null) {
    isValid = false;
    validationError.errors.pcontents = { message : "pcontent is required" };
  }

  if (!isValid) return res.status(400).json(validationError);
  /* 유효성 체크 끝 */
  let result = '';

  try {
    result = await postingModel.alter(userIdx, postingIdx, pcontents);
  } catch (err) {
    console.log(err);
    return res.json(errorCode[err]);
  }

  /* 포스팅 수정 성공 시 */
  const respond = {
    status: 201,
    message : "Alter posting Successfully",
    result
  };
  return res.status(201).json(respond);

};

/*******************
 *  like
 *  @param: useridx, postingidx
 *  TODO like posting
 *  TODO 포스팅 공감하기
 ********************/
exports.like = async (req, res, next) => {
  /* PARAM */
  const userIdx = req.userData.idx;
  const postingIdx = req.body.postingIdx || req.params.postingIdx;
  /* 유효성 체크하기 */
  let isValid = true;

  if (!userIdx || userIdx === null) {
    isValid = false;
    validationError.errors.userIdx = { message : "userIDX is required" };
  }

  if (!postingIdx || postingIdx === null) {
    isValid = false;
    validationError.errors.postingIdx = { message : "postingIDX is required" };
  }

  if (!isValid) return res.status(400).json(validationError);
  /* 유효성 체크 끝 */

  let result = '';

  try {
    result = await postingModel.like(userIdx, postingIdx);
  } catch (err) {
    console.log(err);
    return res.json(errorCode[err]);
  }

  /* 삭제 성공 시 */
  const respond = {
    status: 201,
    message : "Like posting Successfully",
    result
  };
  return res.status(201).json(respond);
};

/*******************
 *  unlike
 *  @param: useridx, postingidx
 *  TODO unlike posting
 *  TODO 포스팅 공감 취소하기
 ********************/
exports.unlike = async (req, res, next) => {
  /* PARAM */
  const userIdx = req.userData.idx;
  const postingIdx = req.body.postingIdx || req.params.postingIdx;
  /* 유효성 체크하기 */
  let isValid = true;

  if (!userIdx || userIdx === null) {
    isValid = false;
    validationError.errors.userIdx = { message : "userIDX is required" };
  }

  if (!postingIdx || postingIdx === null) {
    isValid = false;
    validationError.errors.postingIdx = { message : "postingIDX is required" };
  }

  if (!isValid) return res.status(400).json(validationError);
  /* 유효성 체크 끝 */

  let result = '';

  try {
    result = await postingModel.unlike(userIdx, postingIdx);
  } catch (err) {
    console.log(err);
    return res.json(errorCode[err]);
  }

  /* 삭제 성공 시 */
  const respond = {
    status: 201,
    message : "Unlike posting Successfully",
    result
  };
  return res.status(201).json(respond);
};
