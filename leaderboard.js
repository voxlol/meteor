PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
    // this code only runs in the client
    Template.leaderboard.helpers({
        'player': function() {
            return PlayersList.find({}, {sort: {score: -1,name: 1}});
        },
        
        'selectedClass': function() {
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if (playerId == selectedPlayer) {
                return "selected"
            }
        },
        
        
        'otherHelperFunction': function() {
            return "Some other function"
        },
        
        'count': function() {
            return PlayersList.find().count()
        },
        
        'showSelectedPlayer': function() {
            // code goes here
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayersList.findOne(selectedPlayer);
        }
    });
    
    Template.leaderboard.events({
        // events go here
        'click .player': function() {
            var playerId = this._id;
            Session.set('selectedPlayer', playerId); // sets the shit in session
        },
        
        'click .increment': function() {
            // code goes here
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc: {score: 5}});
        },
        
        'click .decrement': function() {
            // code goes here
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc: {score: -5}});
        }
    
    })
}




if (Meteor.isServer) {
    // this codeo nly runs on the server
    
    if (PlayersList.find().count() == null) {
        PlayersList.insert({name: 'David',score: 0});
        PlayersList.insert({name: 'John',score: 0});
        PlayersList.insert({name: 'Allen',score: 0});
        PlayersList.insert({name: 'Kevin',score: 0});
        PlayersList.insert({name: 'Jason',score: 0});
        PlayersList.insert({name: 'Luigi',score: 0});
    }

}
