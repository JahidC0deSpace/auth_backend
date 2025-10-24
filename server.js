import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";
import bodyParser from 'body-parser';



const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-y");
app.use(bodyParser.json()); // for parsing application/json

const port = 8080;


/** HTTP GET Request */
app.get("/", (req, res) => {
  res.status(201).json("Home get request");
});

/** api routes */
app.use('/api',router);


/** start server only when we have valid connection */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`the server is running on port ${port}`);
      });
    } catch (error) {
      console.log("cannot connect the server");
    }
  })
  .catch((e) => {
    console.log("invalid data server");
  });
