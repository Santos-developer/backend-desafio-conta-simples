const userAPI = require("../api/user");

module.exports = app => {
  app
    .route("/api/user")
    .get(userAPI.read)
    .post(userAPI.create)
    .patch(userAPI.update)
    .delete(userAPI.remove);
};
