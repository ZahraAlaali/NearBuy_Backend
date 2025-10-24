const { Schema } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    DoB:{type:Date},
    picture:{type:String},
    level:{type:Number},
    points:{type:Number}
  },
  { timestamps: true }
)

module.exports = userSchema
