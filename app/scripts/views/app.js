define([
  'backbone',
  'views/slides',
  'collections/slides',
  'router'
],
function(Backbone, SlidesView, SlidesCollection, MainRouter) {
  var AppView = Backbone.View.extend({
    el: 'body',

    initialize: function () {
      var testCollection = [
        { title: 'first slide' },
        { title: 'second slide' }
      ];

      App.router = new MainRouter();

      new SlidesView({
        collection: new SlidesCollection(testCollection)
      });

      Backbone.history.start();
    }
  });

  return AppView;
});