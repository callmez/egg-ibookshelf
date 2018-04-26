'use strict';

module.exports = (app, config) => {
  const exports = {};

  const cfg = {};
  if (config.knex.clients) {
    cfg.clients = {};
    for (const name in config.knex.clients) {
      cfg.clients[name] = {
        key: name, // same to knex.clients keys name
      };
    }
  } else {
    cfg.client = {};
  }

  exports.bookshelf = {
    ...cfg,
    modelDir: 'app/model',
    modelKey: 'model',
    app: true,
    agent: false,
  };

  return exports;
};
