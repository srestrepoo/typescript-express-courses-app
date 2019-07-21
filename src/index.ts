import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import UserController from "./users/user.controller";

const application = new App(
  [
    new AuthenticationController(),
    new UserController()
  ],
);

application.listen();
