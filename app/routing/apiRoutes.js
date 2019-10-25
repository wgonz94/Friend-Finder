var friends = require("../data/friends");
var path = require("path")

module.exports = function(app) {
    app.get("/api/friends", function(req,res){
        res.json(friends);
    });


    app.post("/api/friends", function(req,res) {
        console.log(req.body.scores)

        //friend details(name, photo, and scores)
        var user = req.body;

        

        // default index for friends,let friendIndex = 0; 
        //Another aspect looked, data-attr
        let matchName = "";
        let matchPhoto = "";
        // default score number for comparison
        let totalDifference = 10000;

        //create for loop to generate friends list
        //create second for loop to pull scores to compare 
        //parse values
        for(var i = 0; i < friends.length; i++){
            var differ = 0;
            for (var j = 0; j < user.scores.length; j++) {
                var between = Math.abs(parseInt(user.scores[j]) - parseInt(friends[i].scores[j]))
                differ += between;
                
            };
    
         
         
         if(differ < totalDifference) {
            totalDifference = differ;
            console.log(totalDifference)
            matchName = friends[i].name;
            console.log(matchName)
            matchPhoto = friends[i].photo;
            console.log(matchPhoto)
        };


        };
        //if total is smaller than Minimum, it will become new minimum
        //therefore, having chosen the "best match"
        
        //push new entry into friends list
        friends.push(user)
        //friends[friendIndex]
        res.json({matchName: matchName, matchPhoto: matchPhoto});

    });
};