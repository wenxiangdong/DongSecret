const cloud = require('wx-server-sdk');
const env = require('./constants/envs');

const db = cloud.database({ env: env.DYNAMIC_CURRENT_ENV });

module.exports = db;
