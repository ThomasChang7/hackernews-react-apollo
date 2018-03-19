'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var signup = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, ctx, info) {
    var password, user, token;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bcrypt.hash(args.password, 10);

          case 2:
            password = _context.sent;
            _context.next = 5;
            return ctx.db.mutation.createUser({
              data: (0, _extends3.default)({}, args, { password: password })
            });

          case 5:
            user = _context.sent;
            token = jwt.sign({ userId: user.id }, APP_SECRET);
            return _context.abrupt('return', {
              token: token,
              user: user
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function signup(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var login = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(parent, args, ctx, info) {
    var user, valid;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return ctx.db.query.user({ where: { email: args.email } });

          case 2:
            user = _context2.sent;

            if (user) {
              _context2.next = 5;
              break;
            }

            throw new Error('No such user found');

          case 5:
            _context2.next = 7;
            return bcrypt.compare(args.password, user.password);

          case 7:
            valid = _context2.sent;

            if (valid) {
              _context2.next = 10;
              break;
            }

            throw new Error('Invalid password');

          case 10:
            return _context2.abrupt('return', {
              token: jwt.sign({ userId: user.id }, APP_SECRET),
              user: user
            });

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function login(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var vote = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(parent, args, ctx, info) {
    var linkId, userId, linkExists;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            linkId = args.linkId;
            userId = getUserId(ctx);
            _context3.next = 4;
            return ctx.db.exists.Vote({
              user: { id: userId },
              link: { id: linkId }
            });

          case 4:
            linkExists = _context3.sent;

            if (!linkExists) {
              _context3.next = 7;
              break;
            }

            throw new Error('Already voted for link: ' + linkId);

          case 7:
            return _context3.abrupt('return', ctx.db.mutation.createVote({
              data: {
                user: { connect: { id: userId } },
                link: { connect: { id: linkId } }
              }
            }, info));

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function vote(_x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var _require = require('../utils'),
    APP_SECRET = _require.APP_SECRET,
    getUserId = _require.getUserId;

function post(parent, _ref, ctx, info) {
  var url = _ref.url,
      description = _ref.description;

  var userId = getUserId(ctx);
  return ctx.db.mutation.createLink({ data: { url: url, description: description, postedBy: { connect: { id: userId } } } }, info);
}

module.exports = {
  post: post,
  signup: signup,
  login: login,
  vote: vote
};