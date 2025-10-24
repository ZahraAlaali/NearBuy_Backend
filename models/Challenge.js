const { Schema } = require('mongoose')

const challengeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true },
    timer:{type:Number}
  }
)

module.exports = challengeSchema
