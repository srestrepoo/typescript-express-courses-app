import dotenv from "dotenv";
import * as express from "express";
import jwt from "jsonwebtoken";

const validateJWT = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
        dotenv.config();
        const authHeader = request.header("Authorization");
        const token = authHeader.split(" ")[1];
        if (token) {
            jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                if (error) {
                    return response.status(403).json({ success: false, message: "Failed to authenticate token." });
                } else {
                    request.body.userData = decoded;
                    next();
                }
            });
        } else {
            return response.status(403).send({
                message: "No token provided.",
                success: false
            });
        }
    } catch (error) {
        return response.sendStatus(400);
    }
};

export default validateJWT;
