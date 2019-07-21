import App from "./app";
import UserController from "./users/user.controller";

const application = new App(
  [
    new UserController(),
  ],
);

application.listen();
