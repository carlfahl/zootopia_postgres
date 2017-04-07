var express = require('express');
var Animal = require('../models').Animal;
var Comment = require('../models').Comment;
var commentAuth = require('../myMiddleware/commentAuth');

var Router = new express.Router();

Router.use(function (req, res, next) {
  return next();
});

Router.route('/')
  .get(function(req, res){
    Animal.findAll({
      include: [{
        model: Comment,
        as: 'animalComments'
      }]
    })
    .then(animals => {
      res.json({animals});
    })
    .catch(error => {
      res.json({error})
    });
  })
  .post(function(req, res){
    Animal.create({
      name: req.body.name,
      species: req.body.species
    })
    .then(animal => {
      res.json({animal});
    })
    .catch(error => {
      res.json({ message: 'there was an error saving your animal' });
    });
  });

Router.route('/:id')
  .get(function(req, res){
    Animal.findById(req.params.id, {
      include: [{
        model: Comment,
        as: 'animalComments'
      }]
    })
    .then(animal => {
      res.json({animal});
    })
    .catch(error => {
      res.json({ message: 'there was an error finding this animal' });
    });
  })
  .put(function(req, res){
    Animal.findById(req.params.id)
    .then(animal => {
      animal.update({
        name: req.body.name ? req.body.name : animal.name,
        species: req.body.species ? req.body.species : animal.species
      })
      .then(animal => {
        res.json({animal});
      })
      .catch(error => {
        res.json({error});
      })
    })
    .catch(error => {
      res.json({error});
    });
  })
  .delete(function(req, res){
    Animal.findById(req.params.id)
    .then(animal => {
      animal.destroy()
      .then(() => {
        res.json("Animal deleted!")
      })
      .catch(error => {
        res.json({ message: "Was unable to delete animal" })
      });
    })
    .catch(error => {
      res.json({error});
    });
  });

// routes for comments
Router.route('/:id/comments')
  .post(function (req, res) {
    console.log(req.user._id);
    Comment.create({
      title: req.body.title,
      body: req.body.text,
      userId: req.user._id,
      animalId: req.params.id,
    })
    .then(comment => {
      res.json({comment});
    })
    .catch(error =>{
      res.json({error});
    });
  });

Router.route('/:id/comments/:commentId')
  .delete(function (req, res) {
    Comment.findById(req.params.commentId)
    .then(comment => {
      comment.destroy()
      .then(() => {
        res.json({message: 'Comment deleted'});
      })
      .catch(error => {
        res.json({error});
      });
    })
    .catch(error => {
      res.json({error});
    });
  })

Router.route('/comments/:commentId')
  .get(function (req, res) {
    Comment.findById(req.params.commentId, {
      include: [{
        model: User,
        as: 'author',
      }]
    })
    .then(comment => {
      res.json({comment});
    })
    .catch(error => {
      res.json({error});
    });
  })
  .put(function (req, res) {
    console.log("doing commment update");
    Comment.findById(req.params.commentId, function (err, comment) {
      if (err) {
        console.log("Error finding comment");
        res.json({'error': err});
      } else {
        if (req.user) {
          console.log(typeof(comment.author));
          console.log(comment.author.toString());
          console.log(req.user._id.toString());
          if (comment.author.toString() === req.user._id.toString()) {
            comment.body = req.body.text ? req.body.text : comment.body;
                comment.title = req.body.title ? req.body.title : comment.title;
                comment.modified = true;
                comment.save(function (err, data) {
                  if (err) {
                    res.json({error: err});
                  } else {
                    res.json({message: "updated the comment."});
                  }
                });
              } else {
                console.log("Not authorized to update comments");
                res.json({message: "you are not allowed to update this comment."});
              }
            } else {
              res.json({error: 'You must be logged in to update comments'});
            }
          }
        });
      })
      .delete(function (req, res) {
        Comment.findById(req.params.commentId, function (err, comment) {
          Animal.findById(comment.animal, function (err, animal) {
            animal.comments.indexOf(req.params.commentId)
          })
        })
        Comment.remove({'_id': req.params.commentId}, function (err, data) {
          if (err) {
            res.json({message: err});
          } else {
            res.json({message: 'deleted comment with id: '+req.params.commentId});
          }
        })
      });

function isAuthorized(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return null;
  }
}

module.exports = Router;
