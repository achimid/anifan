const mongoose = require('mongoose')

const schema = mongoose.Schema({    
    webSubscription: { 
        type: Object,
        required: false
    }, 
    createdAt: { 
        type: Date, 
        required: true, 
        default: new Date() 
    }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('user', schema)