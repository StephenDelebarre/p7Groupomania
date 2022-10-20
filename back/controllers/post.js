const Posts = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
    const { userId, message} = req.body;
    console.log(req.body)
    const imageURL = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";
    Posts.create({
    userId: userId,
    message: message,
    image: imageURL,
  })
      .then(() => {
        res.status(201).json({ message: "Post créé !" });
      })
      .catch((error) => {
        console.log(error),
        res.status(400).json({ error });
      });
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
            if (posts.image) {
                const fileName = posts.imageURL.split("images/")[1];
                fs.unlink(`images/${fileName}`, () => {
                    Posts.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Post supprimé"}))
                    .catch(() => res.status(400));
                })
            } else {
                Posts.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Post supprimé"}))
                    .catch(() => res.status(400));
            }
        })
        .catch(() => res.status(500));
};

exports.getAllPosts = (req, res, next) => {
    Posts.find()
      .then(Posts => res.status(200).json(Posts))
      .catch(error => res.status(400).json({error}));
  };

//   exports.likeSauce = (req, res, next) => {
//     Sauces.findOne({ _id: req.params.id })
//         .then(sauce => {
//             if(sauce.usersDisliked.indexOf(req.body.userId) == -1 && sauce.usersLiked.indexOf(req.body.userId) == -1) {
//                 if(req.body.like == 1) { 
//                     sauce.usersLiked.push(req.body.userId);
//                     sauce.likes += req.body.like;
//                 } else if(req.body.like == -1) { 
//                     sauce.usersDisliked.push(req.body.userId);
//                     sauce.dislikes -= req.body.like;
//                 };
//             };
//             if(sauce.usersLiked.indexOf(req.body.userId) != -1 && req.body.like == 0) {
//                 const likesUserIndex = sauce.usersLiked.findIndex(user => user === req.body.userId);
//                 sauce.usersLiked.splice(likesUserIndex, 1);
//                 sauce.likes -= 1;
//             };
//             if(sauce.usersDisliked.indexOf(req.body.userId) != -1 && req.body.like == 0) {
//                 const likesUserIndex = sauce.usersDisliked.findIndex(user => user === req.body.userId);
//                 sauce.usersDisliked.splice(likesUserIndex, 1);
//                 sauce.dislikes -= 1;
//             }
//             sauce.save();
//             res.status(201).json({ message: "Like / Dislike mis à jour" });
//         })
//         .catch(error => res.status(500).json({ error }));
// };



exports.likePost = (req, res) => {
    Posts.findOne({_id: req.params.id})
        .then(post => {
            if (!post.usersLiked.includes(req.auth.userId)) {
                post.usersLiked.push(req.body.userId);
                res.status(200).json("Post liké");
            } else {
                post.usersLiked.pull(req.body.userId);
                res.status(200).json("Like retiré");
            }
        })
};