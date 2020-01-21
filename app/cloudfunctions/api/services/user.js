const { NotFoundError } = require('../constants/errors');
const CollectionNames = require('../constants/collection-names');
const db = require('../db');

const UserStates = {
  NORMAL: 2,
  NEW: 0, // 新用户
  NOT_SET_PASSWORD: 1 // 还没设置过全局密码
};

const collection = db.collection(CollectionNames.user);

const auth = async openid => {
  const { data: [user] = [] } = await collection
    .where({
      _openid: openid
    })
    .get();

  if (!!user) {
    return user;
  }

  // 新增用户
  const newUser = {
    since: Date.now(),
    state: UserStates.NEW,
    _openid: openid
  };
  const { _id } = await collection.add({
    data: {
      ...newUser,
      state: UserStates.NOT_SET_PASSWORD
    }
  });
  return {
    ...newUser,
    _id
  };
};

module.exports = {
  UserStates,
  auth
};
