module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://mongo:27017',
};
