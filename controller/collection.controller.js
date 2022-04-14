const Models = require('../models/index');


const createOne = req => {
    return new Promise((resolve, reject) => {
        req.body.owner = req.user._id;
        Models.collection.create(req.body)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}


const readAll = () => {
    return new Promise((resolve, reject) => {
        Models.collection.find()
            .populate({ 
                path: 'owner',
                select: ['firstname', 'lastname', 'email']
            })
            .populate({ 
                path: 'comments' 
            })
            .populate({ 
                path: 'nfts' 
            })
            .exec((err, data) => {

                if (err) { return reject(err) } else {
                    return resolve(data)
                }
            })
    })
}


const readOne = req => {
    return new Promise((resolve, reject) => {
        Models.collection.findById(req.params.id)
            .populate({ 
                path: 'owner',
                select: ['firstname', 'lastname', 'email']
            })
            .populate({ 
                path: 'nfts' 
            })
            .populate({
                path: 'comments',
                populate: { 
                    path: 'owner'
                }
            })
            .exec((err, data) => {
                if (err) { return reject(err) } else {
                    console.log(data)
                    return resolve(data)
                }
            })
    })
}


const updateOne = req => {
    return new Promise((resolve, reject) => {
        Models.collection.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            return err
            ? reject(err)
            : resolve(data)
        })
    })
}


const deleteOne = req => {
    return new Promise((resolve, reject) => {
        Models.collection.deleteOne({ _id: req.params.id, owner: req.user._id }, (err, data) => {
            return err ?
                reject(err) :
                resolve(data)
        })
    })
}


module.exports = {
    createOne,
    readAll,
    readOne,
    updateOne,
    deleteOne
}