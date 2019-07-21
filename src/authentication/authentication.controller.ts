import dotenv from "dotenv";
import * as express from "express";
import jwt from "jsonwebtoken";
import userModel from "../users/user.model";

class AuthenticationController {
    public path = "/auth";
    public router = express.Router();
    constructor() {
        dotenv.config();
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(`${this.path}/login`, this.login);
    }

    public login = async (request: express.Request, response: express.Response) => {
        try {
            const user = await userModel.findOne({username: request.body.username});
            if (!user) {
                response.sendStatus(404);
              } else if (user.password !== request.body.password) {
                response.sendStatus(401);
              } else {
                const payload = {
                  lastname: user.lastname,
                  name: user.name,
                  role: user.role,
                  username: user.username
                };
                const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "2h" });
                response.status(200).send({ token });
              }
        } catch (error) {
            response.status(500).send(error.message);
        }
    }
}

export default AuthenticationController;
