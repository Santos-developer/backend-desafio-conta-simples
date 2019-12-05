const userAPI = require("../api/user");
const authAPI = require("../api/auth");

module.exports = app => {
  app
    .route("/api/user")
    .get(userAPI.read)
    .post(userAPI.create)
    .patch(userAPI.update)
    .delete(userAPI.remove);

  app
    .route("/api/auth/login")
    .post(authAPI.login)
};
