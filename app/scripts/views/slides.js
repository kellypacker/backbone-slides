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

    changeSlide: function(opts) {
      var self = this;
      var newSlide;
      var $slides = this.$el.children()
      // If we are requesting a specific slide
      // then set current index
      if ( opts.slideIndex ){
        this.currentSlideIndex = ~~opts.slideIndex;
      } else {
        // otherwise grab next or prev slide
        this.setCurrentSlideIndex(opts.direction);
      }

      newSlide = $slides.eq(this.currentSlideIndex - 1);
      // transition to new slide
      $slides.filter(':visible')
        .css('position', 'absolute')
        .animate({
          top: opts.direction === 'next' ? '100%' : '-100%',
          opacity: 'hide'
        }, this.transitionSpeed, function() {
          //slide is gone
          $(this).css('top', 0);
          newSlide
            .css('top', opts.direction === 'next' ? '-100%' : '100%')
            .animate({
              top: 0,
              opacity: 'show'
            }, self.transitionSpeed);
        });

      App.router. navigate('/slides/' + this.currentSlideIndex);

    },

    setCurrentSlideIndex: function(direction) {
      this.currentSlideIndex += direction === 'next' ? 1 : -1;

      if (this.currentSlideIndex > this.numSlides ) {
        this.currentSlideIndex = 1;
      }

      if (this.currentSlideIndex <= 0) {
        this.currentSlideIndex = this.numSlides;
      }

    },

    renderAll: function() {
      this.$el.empty();
      this.collection.each(this.render, this);
    },

    render: function(slide) {
      var slideView = new SlideView({ model: slide });
      this.$el.append(slideView.render().el);
      return this;
    }

  });
  return SlidesView;
});