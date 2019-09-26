import * as express from "express";

const errorMiddleware = {
    dataBaseConnError: async () => {
        throw new Error("Data base connection error");
    }
};

export default errorMiddleware;
