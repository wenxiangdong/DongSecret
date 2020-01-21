const cloud = require('wx-server-sdk');
const env = require('./constants/envs');

const db = cloud.database();

module.exports = db;
