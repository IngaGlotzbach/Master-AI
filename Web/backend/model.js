const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    msg: {
        type: String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User;

const focusSchema = new Schema({
    clientId: {
        type: String, 
        required: true
    },
    elementId: {
        type: String,
        required: false
    },
    srcElement: {
        type: String, 
        required: false
    },
    timeStamp: {
        type: String, 
        required: true
    },
    type: {
        type: String, 
        required: true
    },
    siteName: {
        type: String, 
        required: true
    },
    date: {
        type: String, 
        required: true
    },
    browser: {
        type: String, 
        required: true
    },
    clientX: {
        type: String, 
        required: false
    }, 
    clientY: {
        type: String, 
        required: false
    },
    key: {
        type: String, 
        required: false
    }, 
    scroll: {
        type: String, 
        required: false
    }, 
    click: {
        type: String, 
        required: false
    }, 
    session: {
        type: String, 
        required: false
    },
    height: {
        type: String, 
        required: false
    }, 
    width: {
        type: String, 
        required: false
    }
})

const Focus = mongoose.model('Focus', focusSchema)
module.exports = Focus;