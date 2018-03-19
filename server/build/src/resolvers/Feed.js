"use strict";

function links(parent, args, context, info) {
  var linkIds = parent.linkIds;

  return context.db.query.links({ where: { id_in: linkIds } }, info);
}

module.exports = {
  links: links
};