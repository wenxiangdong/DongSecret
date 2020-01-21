const CollectionNames = require('../constants/collection-names');
const PasswordUtil = require('../utils/password');
const db = require('../db');
const { NotFoundError, UpdateError } = require('../constants/errors');
const UserStates = require('../constants/user-states');
const _ = db.command;

const decodePassword = (encoded, key) => {
  return PasswordUtil.decode(encoded, key);
};

const setOnePassword = async (openid, newKey, oldKey) => {
  /** 找用户 */
  const userQuery = db
    .collection(CollectionNames.user)
    .where({ _openid: openid });

  const { data: [user] = [] } = await userQuery.get();
  if (!user) throw new NotFoundError('未找到用户');

  /** 更新 secret */
  const updateSecrets = async () => {
    const secretCollection = db.collection(CollectionNames.secret);
    // 取出所有自己的
    const { data: secretList = [] } = await secretCollection
      .where({ _openid: openid })
      .get();
    console.log(secretList);
    // 没有的话尽量退出
    if (!secretList.length) return;

    const newPasswords = secretList.map(secret => {
      const { password: oldPassword, _id } = secret;
      const newPassword = PasswordUtil.encode(
        PasswordUtil.decode(oldPassword, oldKey),
        newKey
      );
      console.log(oldPassword, newPassword);
      return newPassword;
    });

    const updatePromises = secretList.map((item, index) =>
      secretCollection.doc(item._id).update({
        data: {
          password: newPasswords[index]
        }
      })
    );
    await Promise.all(updatePromises);
  };

  // 判断用户状态，normal以下
  if (+user.state < UserStates.NORMAL) {
    const {
      stats: { updated }
    } = await userQuery.update({
      data: {
        state: UserStates.NORMAL
      }
    });
    if (updated !== 1) {
      throw new UpdateError('更新失败');
    }
  } else {
    await updateSecrets();
  }
  return true;
};

module.exports = {
  decodePassword,
  setOnePassword
};
