import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Controller from "./controller";

class App {
    public app: express.Application;
    public port: string;

    constructor(controllers: [Controller]) {
        dotenv.config();
        this.app = express();
        this.port = process.env.SERVER_PORT;

        this.initializeMiddlewares();
        this.initializeDB();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(this.port, () => {
            // tslint:disable-next-line: no-console
            console.log(`App listening on the port ${this.port}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private initializeDB() {
        const mongoDB = process.env.MONGODB_URI;
        mongoose.connect(mongoDB,
            {
                useCreateIndex: true,
                useFindAndModify: false,
                useNewUrlParser: true
            });
        mongoose.Promise = global.Promise;
    }

    private initializeControllers(controllers: [Controller]) {
        controllers.forEach((controller) => {
            this.app.use("/api", controller.router);
        });
    }
}

export default App;
