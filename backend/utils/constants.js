const URL_REGEX = /http(s)?:\/\/(www\.)?[-a-zA-Z0-9.]{2,256}\.[a-zA-Z0-9]{2,6}\b([-a-zA-Z0-9:%_+.~#?&/=]*)/;
const SECRET = '992ab2eceb0fc604c74b637713c012453bafbbf38d127957c13f46cb99b83803';
const EMAIL_REGEX = /[^@\s]+@[^@\s]+\.[^@\s]+/;

module.exports = {
  URL_REGEX,
  SECRET,
  EMAIL_REGEX,
};
