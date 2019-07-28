import * as express from "express";
import validateJWT from "../middleware/validateJWT.middleware";
import User from "./user.interface";
import userModel from "./user.model";
import UserService from "./user.service";

// tslint:disable-next-line: class-name
class UserController {
    public path = "/users";
    public router = express.Router();
    private userService = new UserService();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.get(`${this.path}/:username`, this.getUser);
        this.router.post(this.path, this.createUser);
        this.router.put(`${this.path}/:username`, validateJWT, this.updateUser);
        this.router.delete(`${this.path}/:username`, validateJWT, this.deleteUser);
    }

    public getAllUsers = async (request: express.Request, response: express.Response) => {
        const users = await this.userService.getAllUsers();
        response.send(users).status(200);
    }

    public getUser = async (request: express.Request, response: express.Response) => {
        try {
            const user = await this.userService.getUser(request.params.username);
            response.send(user).status(200);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    public createUser = async (request: express.Request, response: express.Response) => {
        try {
            const userData: User = request.body;
            const user = await this.userService.createUser(userData);
            response.send(user).status(201);
        } catch (error) {
            // TODO: add other error codes
            response.status(500).send(error.message);
        }
    }

    public deleteUser = async (request: express.Request, response: express.Response) => {
        try {
            const userDeleted = await this.userService.deleteUser(request.params.username);
            (userDeleted.n) ? response.sendStatus(204) : response.sendStatus(404);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    public updateUser = async (request: express.Request, response: express.Response) => {
        try {
            const userData: User = request.body;
            const updatedUser = this.userService.updateUser(request.params.username, userData);
            (updatedUser) ? response.send(userData).status(201) : response.sendStatus(404);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

}

export default UserController;
