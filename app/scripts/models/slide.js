define(['backbone'], function(Backbone) {

  var Slide = Backbone.Model.extend({

    defaults: {
      type: 'note',
      title: ''
    },

    initialize: function() {
      this.setFontSize();
    },

    setFontSize: function() {
      var length = this.get("title").length;
      console.log(length)
      var size;
      if ( length >= 80 ) {
        size = 'x-large';
      } else if ( length >= 40 ) {
        size = 'large';
      } else {
        size = 'normal';
      }
      this.set('size', size);
    }

  });

  return Slide;

});