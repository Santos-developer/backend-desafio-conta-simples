const admin = require("./admin");
const userAPI = require("../api/user");
const authAPI = require("../api/auth");

module.exports = app => {
  app.route("/api/auth/login").post(authAPI.login);
  app.route("/api/auth/register").post(authAPI.register);

  app.use(authAPI.requestOnlyAuthenticated);

  app
    .route("/api/user")
    .get(admin(userAPI.read))
    .post(admin(userAPI.create))
    .patch(admin(userAPI.update))
    .delete(admin(userAPI.remove));

  app.route("/api/user-profile")
    .get(userAPI.readProfile);
};
