const mongoose = require('mongoose');
require('dotenv').config();
const {get_full_access_url} = require('./db_password_loader');
const MONGO_URL = get_full_access_url(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.CLUSTER_URL);


mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}