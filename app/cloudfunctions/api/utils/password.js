const crypto = require('crypto');
const ALGORITHM = 'aes192';
const RAW_ENCODING = 'utf8';
const CRYPTO_ENCODING = 'base64';
class PasswordUtil {
  static encode(data, key) {
    const cipher = crypto.createCipher(ALGORITHM, key);
    let result = cipher.update(data, RAW_ENCODING, CRYPTO_ENCODING);
    result += cipher.final(CRYPTO_ENCODING);
    return result;
  }

  static decode(data, key) {
    const decipher = crypto.createDecipher(ALGORITHM, key);
    let result = decipher.update(data, CRYPTO_ENCODING, RAW_ENCODING);
    result += decipher.final(RAW_ENCODING);
    return result;
  }
}

module.exports = PasswordUtil;
