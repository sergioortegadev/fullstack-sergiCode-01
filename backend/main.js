import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import logger from "morgan";

const port = process.env.PORT;

const app = express();

app.use(express.static("./frontend/"));

const server = createServer(app);

app.use(logger("dev"));

server.listen(port, () => ` ▓▒ Server OK on port: ${port} ▒▓`);
