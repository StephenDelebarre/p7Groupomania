const Posts = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
    const post = req.body.post;
    delete post._id;
    const Post = new Posts({
        ...post,

        // imageURL: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    })
    Post.save()
    .then(() => res.status(201).json({message: "Post créé"}))
    .catch(error => res.status(400).json({error}));
};

exports.modifyPost = (req, res, next) => {
    const post = req.file ? {
        ...JSON.parse(req.body.post),
        imageURL: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    } : {...req.body};

    Posts.updateOne({ _id: req.params.id}, {...post, _id: req.params.id})
    .then(() => res.status(200).json({message: "Post modifié"}))
    .catch(() => res.status(401));
};

exports.deletePost = (req, res, next) => {
    Posts.findOne({_id: req.params.id})
        .then(posts => {
            const fileName = posts.imageURL.split("images/")[1];
                fs.unlink(`images/${fileName}`, () => {
                    Posts.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Post supprimé"}))
                    .catch(() => res.status(400));
                })
        })
        .catch(() => res.status(500));
};

exports.getOnePost = (req, res, next) => {
    Posts.findOne({_id: req.params.id})
    .then(Posts => res.status(200).json(Posts))
    .catch(error => res.status(404).json({error}));
};

exports.getAllPosts = (req, res, next) => {
    Posts.find()
      .then(Posts => res.status(200).json(Posts))
      .catch(error => res.status(400).json({error}));
  };


  exports.likePost = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(post => {
            if(post.usersDisliked.indexOf(req.body.userId) == -1 && post.usersLiked.indexOf(req.body.userId) == -1) {
                if(req.body.like == 1) { 
                    post.usersLiked.push(req.body.userId);
                    post.likes += req.body.like;
                } else if(req.body.like == -1) { 
                    post.usersDisliked.push(req.body.userId);
                    post.dislikes -= req.body.like;
                };
            };
            if(post.usersLiked.indexOf(req.body.userId) != -1 && req.body.like == 0) {
                const likesUserIndex = post.usersLiked.findIndex(user => user === req.body.userId);
                post.usersLiked.splice(likesUserIndex, 1);
                post.likes -= 1;
            };
            if(post.usersDisliked.indexOf(req.body.userId) != -1 && req.body.like == 0) {
                const likesUserIndex = post.usersDisliked.findIndex(user => user === req.body.userId);
                sauce.usersDisliked.splice(likesUserIndex, 1);
                post.dislikes -= 1;
            }
            post.save();
            res.status(201).json({ message: "Like / Dislike mis à jour" });
        })
        .catch(error => res.status(500).json({ error }));
};