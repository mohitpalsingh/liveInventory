import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import router from "./routes/record.mjs";

const PORT = 5051;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", router);

app.listen(PORT, () => {
    console.log('Server is running on port: ${PORT}');
});