const { NotFoundError } = require('./errors');
const cloud = require('wx-server-sdk');
const CollectionNames = require('./collection-names');

const UserStates = {
  NORMAL: 2,
  NEW: 0, // 新用户
  NOT_SET_PASSWORD: 1 // 还没设置过全局密码
};

const collection = cloud.database().collection(CollectionNames.user);

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
