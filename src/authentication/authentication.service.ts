import jwt from "jsonwebtoken";
import UserService from "../users/user.service";
import UserAuth from "./authentication.interface";

class AuthenticationService {
    private userService = new UserService();

    public login = async (username: string, password: string) => {
        const response = {
            error : 0,
            token : ""
        };
        const user = await this.userService.getUser(username);
        if (!user) {
            response.error = 404;
        } else if (user.password !== password) {
            response.error = 401;
        } else {
            response.token = await this.createToken(user);
        }
        return response;
    }
    private createPayload = (user: UserAuth) => {
        return {
            lastname: user.lastname,
            name: user.name,
            role: user.role,
            username: user.username
          };
    }
    private createToken = async (user: UserAuth) => {
        const token = await jwt.sign(this.createPayload(user), process.env.JWT_KEY, { expiresIn: "2h" });
        return token;
    }
}

export default AuthenticationService;
