

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
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('modifyPlayerScore',selectedPlayer,5);
    },
    
    'click .decrement': function() {
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('modifyPlayerScore',selectedPlayer,-5);
    },
    
    'click .remove': function() {
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('removePlayerData', selectedPlayer)
    
    
    }

});

// Code for TEMPLATE ADDPLAYERFORM EVENTS
Template.addPlayerForm.events({
    'submit form': function(event) {
        event.preventDefault();
        var playerNameVar = event.target.playerName.value;
        Meteor.call('insertPlayerData', playerNameVar);
    }
});