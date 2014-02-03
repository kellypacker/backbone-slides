define(['backbone', 'views/slide'], function(Backbone, SlideView){
  var SlidesView = Backbone.View.extend({
    el: $('.slides'),

    initialize: function() {
      this.renderAll();
      this.currentSlideIndex = 1;
      this.numSlides = this.collection.length;
      this.transitionSpeed = 400;
      App.Vent.on('init', this.hideAllButFirst, this);
      App.Vent.on('changeSlide', this.changeSlide, this)
    },

    hideAllButFirst: function() {
      this.$el.children(':nth-child(n+2)').hide();
    },

    // opts.direction either 'next' or 'prev'
    // opts.slideIndex
    changeSlide: function(opts) {
      var self = this;
      var newSlide;
      var $slides = this.$el.children();

      this.setCurrentSlideIndex(opts);

      newSlide = this.getNextSlide($slides);
      this.animateToNewSlide($slides, newSlide, opts.direction);

      App.router. navigate('/slides/' + this.currentSlideIndex);

    },

    setCurrentSlideIndex: function(opts) {
      if ( opts.slideIndex ) {
        return this.currentSlideIndex = ~~opts.slideIndex;
      }

      this.currentSlideIndex += opts.direction === 'next' ? 1 : -1;

      if (this.currentSlideIndex > this.numSlides ) {
        this.currentSlideIndex = 1;
      }

      if (this.currentSlideIndex <= 0) {
        this.currentSlideIndex = this.numSlides;
      }

    },

    animateToNewSlide: function($slides, newSlide, direction) {
      var self = this;
      $slides.filter(':visible')
        .animate({
          top: direction === 'next' ? '100%' : '-100%',
          opacity: 'hide'
        }, this.transitionSpeed, function() {
          //slide is gone
          $(this).css('top', 0);
          newSlide
            .css('top', direction === 'next' ? '-100%' : '100%')
            .animate({
              top: 0,
              opacity: 'show'
            }, self.transitionSpeed);
        });

    },

    getNextSlide: function($slides) {
      return newSlide = $slides.eq(this.currentSlideIndex - 1);
    },

    renderAll: function() {
      this.$el.empty();
      this.collection.each(this.render, this);
    },

    render: function(slide) {
      console.log(slide.toJSON())
      var slideView = new SlideView({ model: slide });
      this.$el.append(slideView.render().el);
      return this;
    }

  });
  return SlidesView;
});