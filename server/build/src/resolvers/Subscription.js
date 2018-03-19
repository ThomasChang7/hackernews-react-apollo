"use strict";

var newLink = {
  subscribe: function subscribe(parent, args, ctx, info) {
    return ctx.db.subscription.link(
    // https://github.com/graphcool/prisma/issues/1734
    // { where: { mutation_in: ['CREATED'] } },
    {}, info);
  }
};

var newVote = {
  subscribe: function subscribe(parent, args, ctx, info) {
    return ctx.db.subscription.vote(
    // https://github.com/graphcool/prisma/issues/1734
    // { where: { mutation_in: ['CREATED'] } },
    {}, info);
  }
};

module.exports = {
  newLink: newLink,
  newVote: newVote
};