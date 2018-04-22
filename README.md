

## Usage Examples

```javascript

// [Project]/config/plugin.js
exports.model = {
  enable: true,
  package: 'egg-ibookshelf',
};

// [Project]/app/model/user.js  // example
module.exports = app => {
  return app.bookshelf.Model.extend({
    tableName: 'users',
    ...
  })
};

// useage
let User = app.model.User;
new User({
  ...
});

User.where({id: 1}).fetch();
```