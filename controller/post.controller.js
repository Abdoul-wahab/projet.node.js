const Models = require('../models/index');


const createOne = req => {
    return new Promise((resolve, reject) => {
        console.log('req.user =>', req.user);
        req.body.author = req.user._id;
        Models.post.create(req.body)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}


const readAll = () => {
    return new Promise((resolve, reject) => {
        Models.post.find()
            .populate({ 
                path: 'author',
                select: ['firstname', 'lastname', 'email']
            })
            .populate({ path: 'comment' })
            .exec((err, data) => {

                if (err) { return reject(err) } else {
                    return resolve(data)
                }
            })
    })
}


const readOne = req => {
    return new Promise((resolve, reject) => {
        Models.post.findById(req.params.id)
            .populate({ 
                path: 'author'
            })
            .populate({
                path: 'comments',
                populate: { 
                    path: 'author'
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

        Models.post.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            return err ?
                reject(err) :
                resolve(data)
        })

        Models.post.findById(req.params.id, (err, mongoPost) => {
            if( err ){ return reject(err) }
            else{
                if( mongoPost.author === req.user._id ){
                    Models.post.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
                        return err
                        ? reject(err)
                        : resolve(data)
                    })
                }
                else{ return reject('Unauthorized') };
            }
        })
    })
}


const deleteOne = req => {
    return new Promise((resolve, reject) => {
        Models.post.deleteOne({ _id: req.params.id, author: req.user._id }, (err, data) => {
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