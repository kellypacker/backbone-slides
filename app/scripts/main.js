require.config({
  shim: {
    "backbone": {
      deps: ["../components/underscore/underscore", "jquery"],
      exports: "Backbone"
    }
  },

  paths: {
    jquery: 'vendor/jquery.min',
    backbone: '../components/backbone/backbone-min'
  }
});

require(['models/slide', 'views/slide'], function (SlideModel, SlideView) {
  var slide = new SlideModel({ title: "My first slide" });
  var slideView = new SlideView({ model: slide });
  slideView.render();
  console.log(slideView.el)
});
