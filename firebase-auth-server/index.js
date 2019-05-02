import login from './firebase-login';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { stringify } from 'querystring';

let app = express();
app.use(cors())
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  let params = req.body;
  console.log(params);
  let token = await login(params.username, params.password, params.project);
  console.log(token);
  res.end(JSON.stringify({ token: token }));
})

app.listen(81, () => console.log("Listening on port 81"));