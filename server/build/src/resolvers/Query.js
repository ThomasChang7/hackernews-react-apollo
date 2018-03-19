"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var feed = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, ctx, info) {
    var filter, first, skip, where, allLinks, count, queriedLinkes;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filter = args.filter, first = args.first, skip = args.skip; // destructure input arguments

            where = filter ? { OR: [{ url_contains: filter }, { description_contains: filter }] } : {};
            _context.next = 4;
            return ctx.db.query.links({});

          case 4:
            allLinks = _context.sent;
            count = allLinks.length;
            _context.next = 8;
            return ctx.db.query.links({ first: first, skip: skip, where: where });

          case 8:
            queriedLinkes = _context.sent;
            return _context.abrupt("return", {
              linkIds: queriedLinkes.map(function (link) {
                return link.id;
              }),
              count: count
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function feed(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  feed: feed
};