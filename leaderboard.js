PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  // this code only runs in the client
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find();
    },

    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer){
        return "selected"
      }
    },


    'otherHelperFunction': function(){
      return "Some other function"
    },
    'count': function(){
      return PlayersList.find().count()
    }

  });

  Template.leaderboard.events({
    // events go here
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    }
  })
}

if(Meteor.isServer){
  // this codeo nly runs on the server

  if (PlayersList.find().count() == null){
    PlayersList.insert({name:'David', score: 0});
    PlayersList.insert({name:'John', score: 0});
    PlayersList.insert({name:'Allen', score: 0});
    PlayersList.insert({name:'Kevin', score: 0});
    PlayersList.insert({name:'Jason', score: 0});
    PlayersList.insert({name:'Luigi', score: 0});
  }

}