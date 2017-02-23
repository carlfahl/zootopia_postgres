var express = require('express');
var Animal = require('../models/animal');
var Comment = require('../models/comment');

var Router = new express.Router();

Router.route('/')
  .get(function(req, res){
    Animal.find()
      .populate('comments')
      .exec(function(err, animals){
        if (err) {
          res.json(err, 'ERROR');
        } else {
          res.json(animals);
        }
      });
  })
  .post(function(req, res){
    var animal = new Animal({
      name: req.body.name,
      species: req.body.species
    });
    animal.save(function(err, animal){
      if (err) {
        res.json({ message: 'there was an error saving your animal' });
      } else {
        res.json(animal);
      }
    });
  });

Router.route('/:id')
  .get(function(req, res){
    Animal.findById(req.params.id)
      .populate('comments')
      .exec(function(err, animal){
      if (err) {
        res.json({ message: 'there was an error finding this animal' });
      } else {
        res.json(animal);
      }
    });
  })
  .put(function(req, res){
    Animal.findById(req.params.id, function(err, animal){
      if(err) {
        res.json({ message: 'could not find course' })
      } else {
        animal.name = req.body.name ? req.body.name : animal.name;
        animal.species = req.body.species ? req.body.species : animal.species;
        animal.save( function(er) {
          if (er) {
            res.json(err)
          } else {
            res.json(animal)
          }
        })
      }
    })
  })
  .delete(function(req, res){
    Animal.remove({ _id: req.params.id }, function(err) {
      if(err){
        res.json({ message: "Was unable to delete animal" })
      } else {
        res.json("Animal deleted!")
      }
    })
  });

  // routes for comments
  Router.route('/:id/comments')
    .post(function (req, res) {
      var comment = new Comment();
      comment.title = req.body.title;
      comment.body = req.body.text;
      comment.author = req.user._id;
      
    });

module.exports = Router;
