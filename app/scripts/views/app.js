define([
  'backbone',
  'views/slides',
  'collections/slides',
  'router'
],
function(Backbone, SlidesView, SlidesCollection, MainRouter) {
  var AppView = Backbone.View.extend({
    el: 'body',
    events: {
      'keyup': 'keyUp'
    },

    initialize: function () {
      var testCollection = [
        { title: 'first slide' },
        { title: 'second slide' },
        { title: 'third slide' }
      ];

      App.router = new MainRouter();

      new SlidesView({
        collection: new SlidesCollection(testCollection)
      });

      Backbone.history.start();
    },

    keyUp: function(e) {
      // 37 = left
      // 39 = right
      if ( e.keyCode === 37 || e.keyCode === 39) {
        App.Vent.trigger('changeSlide', {
          direction: e.keyCode === 39 ? 'next' : 'prev'
        });
      }
    }

  });

  return AppView;
});