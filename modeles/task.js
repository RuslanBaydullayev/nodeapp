const { text } = require('express')
const {Schema, model} = require('mongoose')
const router = require('../router/page')
const task = new Schema({
    title: {
        required: true,
        type:String
    },
    text: {
        required: true,
        type:String
    },
    status: {
        required: true,
        type:String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})
module.exports = model('Task', task)