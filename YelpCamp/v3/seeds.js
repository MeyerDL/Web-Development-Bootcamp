var mongoose = require("mongoose"); 
var Campground = require("./models/campground"); 
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest", 
            image: "https://cdn.stocksnap.io/img-thumbs/960w/PTERNSNX0F.jpg",
            description: "blah blah blah"
        },
        {
            name: "Desert", 
            image: "https://cdn.stocksnap.io/img-thumbs/960w/PTERNSNX0F.jpg",
            description: "blah blah blah"
        },
        {
            name: "Canyon Floor", 
            image: "https://cdn.stocksnap.io/img-thumbs/960w/PTERNSNX0F.jpg",
            description: "blah blah blah"
        },
    ]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campgound");
                    //create a comment
                    Comment.create(
                        {
                            text: "This is a great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment")
                            }
                    });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
