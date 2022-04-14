
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


    const deleteOne = req => {
        return new Promise( (resolve, reject) => {
            Models.comment.deleteOne({ _id: req.params.id }, (err, data) => {
                return err
                ? reject(err)
                : resolve(data)
            })
        })
    }

    module.exports = {
        createOne,
        deleteOne
    }