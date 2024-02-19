import express, { Express, Request, Response } from "express";
import fs from 'fs';
const mongoose = require('mongoose');

const app: Express = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/test');
const blogSchema = new mongoose.Schema({
  user: String,
  datas: Object,
});

// console.log(datajson)
const Blog = mongoose.model('timesheets', blogSchema);

export interface TypedRequestBody<T> extends Express.Request {
  datas: T
}

const cors = require("cors");
app.use(cors());
app.use(express.json())

app.get("/get_data", (req: Request, res: Response) => {
  Blog.findOne({ user: 'arjun' })
    .then((docs:TypedRequestBody<{}>) => {
      res.status(200).json(docs.datas);
    })
    .catch((err:any) => {
      console.log(err);
    });
  
});

app.post("/post_data", (req: Request, res: Response) => {
  console.log("in")
  console.log(req.body)
  // let TimesheetData: string = JSON.stringify(req.body)

  const filter = { user: 'arjun' };
  // Blog.findOneAndReplace(filter,{
  //   user:"arjun",
  //   datas:req.body});
  Blog.insertMany({user:"arjun",datas:req.body});

  res.status(200).json("received");
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});