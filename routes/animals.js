var express = require('express');
var Animal = require('../models').Animal;
var Comment = require('../models').Comment;
var Reply = require('../models').Reply;
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
        as: 'animalComments',
        include: [{
          model: Reply,
          as: 'commentReplies'
        }]
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
        as: 'animalComments',
        include: [{
          model: Reply,
          as: 'commentReplies'
        }]
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
  .get(function (req, res) {
    Comment.findAll({
      where: {
        animalId: req.params.id
      }
    })
    .then(todos => {
      res.json({todos});
    })
    .catch(error => {
      res.json({error});
    })
  })
  .post(function (req, res) {
    Comment.create({
      title: req.body.title,
      body: req.body.text,
      author: req.body.user,
      picture: req.body.picture,
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
  .get(function (req, res) {
    Comment.findById(req.params.commentId)
    .then(comment => {
      res.json({comment});
    })
    .catch(error => {
      res.json({error});
    });
  })
  .put(function (req, res) {
    var user = req.body.user;
    if (user) {
      Comment.findById(req.params.commentId)
      .then(comment => {
        if (user === comment.author) {
          comment.update({
            body: req.body.text? req.body.text : comment.body,
            title: req.body.title? req.body.title : comment.title,
            modified: true
          })
          .then(comment => {
            res.json({comment});
          })
          .catch(error => {
            res.json({error});
          });
        } else {
          res.json({message: "you are not allowed to update this comment."});
        }
      })
      .catch(error => {
        res.json({error});
      });
    } else {
      res.json({error: 'You must be logged in to update comments'});
    }
  })
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
  });

Router.route('/:id/comments/:commentId/replies')
  .post(function (req, res) {
    Reply.create({
      text: req.body.text,
      user: req.body.user,
      picture: req.body.picture,
      commentId: req.params.commentId
    })
    .then(reply => {
      res.json({reply});
    })
    .catch(error => {
      res.json({error});
    })
  })

module.exports = Router;
