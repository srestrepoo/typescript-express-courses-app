import * as express from "express";
import User from "./user.interface";
import userModel from "./user.model";

// tslint:disable-next-line: class-name
class UserController {
    public path = "/users";
    public router = express.Router();
    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, this.createUser);
    }

    public getAllUsers = async (request: express.Request, response: express.Response) => {
        const users = await userModel.find();
        response.send(users).status(200);
    }

    public createUser = async (request: express.Request, response: express.Response) => {
        const userData: User = request.body;
        const createdUser = new userModel(userData);
        try {
            const userCreated = await createdUser.save();
            response.send(userCreated).status(201);
        } catch (error) {
            // TODO: add other error codes
            response.status(500).send(error);
        }
    }
}

export default UserController;
