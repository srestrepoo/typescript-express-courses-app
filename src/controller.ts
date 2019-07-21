import express from "express";

class Controller {
    public path: string;
    public router = express.Router();
}

export default Controller;
