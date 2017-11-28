var express = require("express");
var router = express.Router({mergeParans: true});
var Campground = require("../models/campground");
var Campground = require("../models/comment");
var middleware = require("../middleware/index.js");

//Comments New 

router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by ID
    console.log(req.params.id);
    Campground.findById(req.params.id, (function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, (function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    
                //add username and id to comment
                comment.author.id = req.user.id;
                comment.author.username = req.user.username;
                //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
            
        }
    });
});

// Comment Edit Route
router.get("/:comments_id/edit", middleware.checkCommentOwnership, (req, res){
   Comment.findById(req.params.id.comments_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
          res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
      }
   }); 
});

//Comment Update
//campgrounds/:id/comments/:comment_id

router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment{}) )
     if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
    
}); 

//Comments Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;