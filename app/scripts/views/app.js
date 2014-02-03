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

      App.router = new MainRouter();

      console.log(new SlidesCollection(window.slides))

      new SlidesView({
        collection: new SlidesCollection(window.slides)
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