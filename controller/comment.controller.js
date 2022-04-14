
    const Models = require('../models/index')


    const createOne = (req) => {
        return new Promise( (resolve, reject) => {
        
            req.body.author = req.user._id;
            req.body.isPartOf = req.params.collectionId;

            Models.comment.create(req.body)
            .then( async commentData => {
                await Models.collection.findByIdAndUpdate(req.params.collectionId, { $push: { comments: commentData._id } })
                return resolve({ comment: commentData })
            })
            .catch( commentError => reject(commentError) )
        })
    }


    const readAll = () => {
        return new Promise( (resolve, reject) => {
            Models.comment.find( (err, data) => {
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }


    const readOne = req => {
        return new Promise( (resolve, reject) => {

            Models.comment.findById(req.params.id)
            .populate({ 
                path: 'author'
            })
            .exec( (err, data) => {
                if( err ){ return reject(err) }
                else{
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
        return new Promise( (resolve, reject) => {

            Models.comment.deleteOne({ _id: req.params.id, author: req.user._id }, (err, data) => {
                return err
                ? reject(err)
                : resolve(data)
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