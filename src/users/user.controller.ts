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
        this.router.get(`${this.path}/:username`, this.getUser);
        this.router.post(this.path, this.createUser);
        this.router.put(`${this.path}/:username`, this.updateUser);
        this.router.delete(`${this.path}/:username`, this.deleteUser);
    }

    public getAllUsers = async (request: express.Request, response: express.Response) => {
        const users = await userModel.find();
        response.send(users).status(200);
    }

    public getUser = async (request: express.Request, response: express.Response) => {
        try {
            const user = await userModel.findOne({ username: request.params.username });
            response.send(user).status(200);
        } catch (error) {
            response.status(500).send(error);
        }
    }

    public createUser = async (request: express.Request, response: express.Response) => {
        try {
            const userData: User = request.body;
            const createdUser = new userModel(userData);
            const user = await createdUser.save();
            response.send(user).status(201);
        } catch (error) {
            // TODO: add other error codes
            response.status(500).send(error);
        }
    }

    public deleteUser = async (request: express.Request, response: express.Response) => {
        try {
            await userModel.deleteOne({ username: request.params.username });
            response.sendStatus(204);
        } catch (error) {
            response.status(500).send(error);
        }
    }

    public updateUser = async (request: express.Request, response: express.Response) => {
        try {
            const userData: User = request.body;
            await userModel.findOneAndUpdate({ username: request.params.username }, userData);
            response.send(userData).status(201);
        } catch (error) {
            response.status(500).send(error);
        }
    }

}

export default UserController;
