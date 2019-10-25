var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req,res){
        res.json(friends);
    });


    app.post("/api/friends", function(req,res) {
        console.log(req.body.scores)

        //friend details(name, photo, and scores)
        var user = req.body;

        //parse scores
        for(var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        // default index for friends, will change once comparing differences in scores
        let friendIndex = 0;
        // default score number for best match
        let minScore = 400000;

        //create for loop to generate friends list
        //create second for loop to pull scores individual to compare
        for(var i = 0; i < friends.length; i++){
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                // console.log('This User Score: ' + user.scores[j])
                // console.log('This is Friends score' + friends[i].scores[j])
                var between = Math.abs(user.scores[j] - friends[i].scores[j])
                // console.log('this is between--' + between)
                totalDifference += between;
                // console.log(totalDifference)
            };
        //if total is smaller than Minimum, it will become new minimum
        //therefore, having chosen the "best match"
            if(totalDifference < minScore) {
                friendIndex = i;
                minScore = totalDifference;
            };
        };
        //push new entry into friends list
        friends.push(user)
        
        res.json(friends[friendIndex]);

    })
}