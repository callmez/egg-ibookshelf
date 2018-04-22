'use strict';

module.exports = app => {
  if (app.config.bookshelf.app) require('./lib/bookshelf')(app);
};
