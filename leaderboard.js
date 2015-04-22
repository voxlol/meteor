 // Globals are here
PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
    // this code only runs in the client
    Meteor.subscribe('thePlayers');
    // code for Template Leaderboard Helpers (functions etc)
    Template.leaderboard.helpers({
        'player': function() {
            var currentUserId = Meteor.userId();
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

    // Code for TEMPLATE LEADERBOARD EVENTS!!!
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
        },
        
        'click .remove': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.remove(selectedPlayer);
        
        
        }
    
    });

    // Code for TEMPLATE ADDPLAYERFORM EVENTS
    Template.addPlayerForm.events({
        'submit form': function(event) {
            event.preventDefault();
            var playerNameVar = event.target.playerName.value;
            var currentUserId = Meteor.userId();
            
            console.log(playerNameVar);
            PlayersList.insert({
                name: playerNameVar,
                score: 0,
                createdBy: currentUserId
            });
        }
    });
}




if (Meteor.isServer) {
    Meteor.publish('thePlayers',function(){
        // inside the publish function
        var currentUserId = this.userId;
        return PlayersList.find({createdBy:currentUserId});
    });

}
