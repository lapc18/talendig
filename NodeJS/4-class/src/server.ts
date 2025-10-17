import express from "express";
import cors from "cors";
import contactRouter from "./routes/contacts.route";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
// custom middlewares here...

app.use('/api/v1/contacts', contactRouter)

 
export default app;

// #sinMiedoAlExito