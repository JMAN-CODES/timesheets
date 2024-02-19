const mongoose = require('mongoose');
 
var fs = require('fs');
const rawdata = fs.readFileSync('src/data/timesheetdata.json')
const datajson = JSON.parse(rawdata);
 
mongoose.connect('mongodb://localhost:27017/jman');
const blogSchema = new mongoose.Schema({
  user:String,
  datas:Object,
});

// console.log(datajson)
const Blog = mongoose.model('timesheets', blogSchema);
// Blog.insertMany({user:"arjun",datas:datajson});

// Blog.find({user: "arjun"}, function(err, user) 
// {
//    if (err)
//    {
//        console.log(user)
//    }
//    console.log(user);

// });

Blog.findOne({user:'arjun'})
   .then((docs)=>{
       console.log("Result :",docs.datas);
   })
   .catch((err)=>{
       console.log(err);
});

