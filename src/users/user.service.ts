import User from "./user.interface";
import userModel from "./user.model";

class UserService {
    public createUser = async (userData: User) => {
        const createdUser = new userModel(userData);
        const user = await createdUser.save();
        return user;
    }
    public deleteUser = async (userToDelete: string) => {
        const userDeleted = await userModel.deleteOne({ username: userToDelete });
        return userDeleted;
    }
    public getAllUsers = async () => {
        const users = await userModel.find();
        return users;
    }
    public getUser = async (userToFind: string) => {
        const user = await userModel.findOne({ username: userToFind });
        return user;
    }
    public updateUser = async (userToUpdate: string, updatedUser: User) => {
        const user = await userModel.findOneAndUpdate({ username: userToUpdate }, updatedUser);
        return user;
    }

}

export default UserService;
