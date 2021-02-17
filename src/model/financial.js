const mongoose = require('mongoose');

const FinancialSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    deals: [{
        type: mongoose.Types.ObjectId,
        ref: 'Deals'
    }],
    total: {
        type: Number,
        default: 0
    },
},{timestamps: true});

module.exports = mongoose.model('Finantials', FinancialSchema);
