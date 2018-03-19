'use strict';

var jwt = require('jsonwebtoken');
var APP_SECRET = 'GraphQL-is-aw3some';

function getUserId(context) {
  var Authorization = context.request.get('Authorization');
  if (Authorization) {
    var token = Authorization.replace('Bearer ', '');

    var _jwt$verify = jwt.verify(token, APP_SECRET),
        userId = _jwt$verify.userId;

    return userId;
  }

  throw new Error('Not authenticated');
}

module.exports = {
  APP_SECRET: APP_SECRET,
  getUserId: getUserId
};