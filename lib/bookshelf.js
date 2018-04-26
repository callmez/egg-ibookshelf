'use strict';

const path = require('path');
const Bookshelf = require('bookshelf');
const mask = require('bookshelf-mask');
const modelbase = require('bookshelf-modelbase').pluggable;
const jsonColumns = require('bookshelf-json-columns');

const CollectionBase = require('bookshelf/lib/base/collection');
CollectionBase.prototype[Symbol.iterator] = function () { // @see https://github.com/bookshelf/bookshelf/pull/1817
  return this.toArray()[Symbol.iterator]();
};

module.exports = app => {
  app.addSingleton('bookshelf', (config, app) => {
    const client = config.key ? app.knex.get(config.key) : app.knex;
    app.knexLogger.info(`[egg-ibookshelf] instance${config.key ? `[${config.key}]` : ''} status OK`);
    const bookshelf = Bookshelf(client);

    bookshelf.plugin('registry');
    bookshelf.plugin('virtuals');
    bookshelf.plugin('visibility');
    bookshelf.plugin('pagination');
    bookshelf.plugin(mask);
    bookshelf.plugin(modelbase);
    bookshelf.plugin(jsonColumns);

    if (app.config.bookshelf.plugin) bookshelf.plugin(app.config.bookshelf.plugin);

    return bookshelf;
  });

  // load models to app
  const modelOptions = {
    caseStyle: 'upper',
    call: true,
    directory: path.join(app.config.baseDir, app.config.bookshelf.modelDir),
  };
  const modelBase = modelOptions.directory;
  app.loader.loadToApp(modelBase, app.config.bookshelf.modelKey, modelOptions);
  app.knexLogger.info('[egg-ibookshelf] Model loaded: %s', modelBase);
};
