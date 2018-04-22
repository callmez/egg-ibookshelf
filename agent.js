'use strict';

module.exports = agent => {
  if (agent.config.bookshelf.agent) require('./lib/bookshelf')(agent);
};
