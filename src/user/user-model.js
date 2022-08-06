const mongoose = require('mongoose')

const schema = mongoose.Schema({    
    webSubscription: { 
        type: Object,
        required: false
    },
    animeToNotify: [{ 
        type: String,
        required: false
    }], 
    releaseNotified: [{ 
        animeId: { 
            type: String,
            required: false
        },
        episode: { 
            type: Object,
            required: false
        }
    }], 
    createdAt: { 
        type: Date,
        default: new Date() 
    }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('user', schema)