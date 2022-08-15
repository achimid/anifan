const mongoose = require('mongoose')

const schema = mongoose.Schema({    
    title: { 
        type: String, 
        required: true
    },
    anime: { 
        type: String, 
        required: true
    },
    episode: { 
        type: String, 
        required: false
    },
    from: { 
        type: String, 
        required: true
    },
    url: { 
        type: String, 
        required: true
    },
    data: { 
        type: Object,
        required: false,
    }    
}, { versionKey: false, timestamps: true })

schema.index({createdAt: 1},{expireAfterSeconds: 172800}) // 2 dias

module.exports = mongoose.model('integration-event', schema)