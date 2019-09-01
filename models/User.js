const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  fname:{
    type: String,
    required: true
  },
  lname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  pnumber:{
    type: String,
    required: true
  },
  rques:[{
    from_id:String,
    question:String,
    Qdate:{
      type:Date,
      default:Date.now
    }
  }],
  sques:[{
    to_id:String,
    question:String,
    Qdate:{
      type:Date,
      default:Date.now,
    }
  }],
  ans:[{
    from_id:String,
    ans:String,
    ansdate:{
      type:Date,
      default:Date.now,
    },
    likes:Number
  }]
});

mongoose.model('users', UserSchema);
