var express = require('express');
var Animal = require('../models/animal');
var Comment = require('../models/comment');
var commentAuth = require('../myMiddleware/commentAuth');

var Router = new express.Router();

Router.use(function (req, res, next) {
  return next();
});

Router.route('/')
  .get(function(req, res){
    console.log('Limit result to: ', req.query.limit);
    console.log('Sort by: ', req.query.sort);
    Animal.find({name: {$nin:['Jeff', 'Bob']}})
      .populate({
        path:'comments',
        populate: {path: 'author'}
      })
      .limit(req.query.limit)
      .sort(req.query.sort)
      .select(req.query.select)
      // .where('name').notin(['Jeff', 'Bob'])
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
      .populate({
        path: 'comments',
        populate: {path: 'author'}
      })
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
      comment.animal = req.params.id;
      comment.save(function (err, comment) {
        if (err) {
          console.log("Error at comment save");
          res.json({error: err});
        } else {
          Animal.findById(req.params.id, function (err, animal) {
            if (err) {
              console.log("Error at animal find.");
              res.json({error: err});
            } else {
              animal.comments.push(comment._id);
              animal.save(function (err, data) {
                if (err) {
                  console.log("Error at animal resave.");
                  res.json({error: err});
                } else {
                  res.json(data);
                }
              });
            }
          });
        }
      });
    });

    Router.route('/:id/comments/:commentId')
      .delete(function (req, res) {
        Animal.findById(req.params.id, function (err, animal) {
          var deleteIndex = animal.comments.indexOf(req.params.commentId);
          animal.comments = animals.comments.slice(0, deleteIndex).concat(animal.comments.slice(deleteIndex+1));
          animal.save();
        });
        Comment.remove({'_id': req.params.commentId});
      })

    Router.route('/comments/:commentId')
      .get(function (req, res) {
        Comment.findById(req.params.commentId)
        .populate('author')
        .exec(function (err, comment) {
          if (err) {
            res.json({});
          } else {
            res.json(comment);
          }
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
