const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ShoutOutSchema = new Schema({
  Question:{
    type: String,
    required: true
  }, 
  User_id:{
     type: String,
     required:true
    },
    QuestionDate:{
        type:Date,
        default:Date.now
    },
    UserName:{
        type:String
    },
    IsAnonymous:{
        type:Boolean
    },
  
  Answers:[{
    User_id:String,
    ans:String,
    ansdate:{
      type:Date,
      default:Date.now,
    },
    likes:Number
  }]
});

mongoose.model('ShoutOuts', ShoutOutSchema);
