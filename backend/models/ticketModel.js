const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    product: {
        type: String,
        required: [true, `Please provide select a product you're having trouble with`],
        enum: ['Opus', 'Device Alive', 'OnTheClock', 'CCKM', 'MST', 'Demo TV', 'Other']
    },
    description: {
        type: String,
        required: [true, `Please provide a short description about what's happening`],
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'open', 'closed'],
        default: 'pending',
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Ticket', ticketSchema)