const mongoose = require('mongoose')

const schema = mongoose.Schema({    
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    source: {
        mal: { type: Object },
        atc: { type: Object }
    },
    extra: {
        type: [{ type: Object }],
        default: undefined
    }    
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('anime', schema)