import express from 'express'
import { configDotenv } from 'dotenv'
import db_connect from './config/db_connect.mjs'
import router from './routes/index.mjs'
import cors from 'cors'
import clickerController from './controller/clickerController.mjs'
import helmet from "helmet";

configDotenv();

db_connect(process.env.DB)
const app = express()
app.use(express.json())

setInterval(clickerController.autoclicker, 5000);

app.use((req, res, next) => {
    console.log(req.headers);
    next();
  });

app.use(cors({origin:'*'}))
app.use(helmet())
app.use(router)

app.listen(process.env.PORT,(err)=> err ? console.log(err) : console.log(`http://localhost:${process.env.PORT}`));