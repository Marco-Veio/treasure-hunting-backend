import http from "http";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("Server is running on port 8000 secret teste");
});
