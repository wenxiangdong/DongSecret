const CollectionNames = require('../constants/collection-names');
const db = require('../db');
const { UpdateError, NotFoundError } = require('../constants/errors');
const PasswordUtil = require('../utils/password');

const secretCollection = db.collection(CollectionNames.secret);
const _ = db.command;

/**
 * 更新或新增
 * @param {*} secret
 * @param {String} key
 */
const upsertSecret = async (secret, key) => {
  const { _id } = secret;
  if (_id) {
    return updateSecret(secret, key);
  } else {
    // 新增
    return addSecret(secret, key);
  }
};
const updateSecret = async (secret, key) => {
  const { _id, _openid, ...rest } = secret;
  const newSecret = { ...rest };
  console.log('update', newSecret);
  /** 找出旧的 */
  const { data: oldSecret } = await secretCollection.doc(_id).get();
  console.log('old', oldSecret);
  if (!oldSecret) {
    throw new NotFoundError('找不到密码项');
  }
  /** 如果密码不同，则是用户更新了密码，那需要重新加密 */
  if (oldSecret.password !== newSecret.password) {
    newSecret.password = PasswordUtil.encode(newSecret.password, key);
  }
  /** 更新 */
  const {
    stats: { updated }
  } = await secretCollection.doc(_id).update({
    data: { ...newSecret }
  });
  if (updated === 1) {
    return {
      ...newSecret,
      _id
    };
  } else {
    throw new UpdateError('更新密码项失败');
  }
};
const addSecret = async (secret, key) => {
  console.log('add', secret);
  const { password } = secret;
  const encodedPassword = PasswordUtil.encode(password, key);
  // 新增
  const newSecret = {
    ...secret,
    createAt: Date.now(),
    password: encodedPassword
  };
  const { _id } = await secretCollection.add({
    data: newSecret
  });
  return {
    ...newSecret,
    _id
  };
};

/**
 * 获取我的密码项
 * @param {String} openid
 * @param {Number} count default 1000
 */
const getSecrets = async (openid, count = 1000) => {
  const { data: secretList = [] } = await secretCollection
    .where({
      _openid: openid
    })
    .limit(count)
    .get();
  return secretList;
};
/**
 * 删除ids中的所有
 * @param {String[]} ids
 * @returns {Number} 删除的个数
 */
const deleteSecrets = async (ids = []) => {
  const {
    stats: { removed }
  } = await secretCollection
    .where({
      _id: _.in(ids)
    })
    .remove();
  console.log('removed', removed);
  return removed;
};

module.exports = {
  upsertSecret,
  getSecrets,
  deleteSecrets
};
