Places = new Mongo.Collection('places');

if (Meteor.isServer) {
    Meteor.publish('places', () => Places.find())
}

if (Meteor.isClient) {
    Meteor.subscribe('places');
}
