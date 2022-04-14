const mongoose = require('mongoose');
const { Schema } = mongoose;


const MySchema = new Schema({
    name: { type: String },
    description: { type: String },
    items: { 
        type: Number,
        default: 0
    },

    nfts: [{
        type: Schema.Types.ObjectId,
        ref: 'nft'
    }],

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],

    dateCreated: {
        type: Date,
        default: new Date()
    },
    dateUpdated: {
        type: Date,
        default: null
    }
})

MySchema.pre('findByIdAndUpdate', (next) => {
    this._update.dateUpdated = new Date()
    this._update.items = this._update.nfts.length
    console.log(this._update)
    next();
});

const MyModel = mongoose.model('collection', MySchema);
module.exports = MyModel;