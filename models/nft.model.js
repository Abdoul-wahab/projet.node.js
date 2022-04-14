const mongoose = require('mongoose');
const { Schema } = mongoose;

const MySchema = new Schema({
    token_address: {
        unique: true,
        type: String
    },
    token_hash: String,
    contract_type: String,
    
    isPartOf: {
        type: Schema.Types.ObjectId,
        ref: 'collection'
    },
    dateCreated: {
        type: Date,
        default: new Date()
    }
})

const MyModel = mongoose.model('nft', MySchema);
module.exports = MyModel;