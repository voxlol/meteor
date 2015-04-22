PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  // this code only runs in the client
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find()
    },
    'otherHelperFunction': function(){
      return "Some other function"
    },
    'count': function(){
      return PlayersList.find().count()
    }

  });
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