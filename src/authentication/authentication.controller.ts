import dotenv from "dotenv";
import * as express from "express";
import AuthenticationService from "./authentication.service";

class AuthenticationController {
  public path = "/auth";
  public router = express.Router();
  private authenticationService = new AuthenticationService();

  constructor() {
    dotenv.config();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(`${this.path}/login`, this.login);
  }

  public login = async (request: express.Request, response: express.Response) => {
    try {
      const auth = await this.authenticationService.login(request.body.username, request.body.password);
      (auth.error) ? response.sendStatus(auth.error) : response.status(200).send({ token : auth.token });
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
}

export default AuthenticationController;
