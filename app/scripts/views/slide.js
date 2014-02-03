define(['backbone'], function (Backbone) {
  var Slide = Backbone.View.extend({
    className: 'slide',

    render: function () {
      if ( this.model.get('image') ) {
        this.renderImage();
      } else if ( this.model.get('bullets') ) {
        this.renderBullets();
      } else if ( this.model.get('quote') ) {
        this.renderQuote();
      } else if ( this.model.get('snippet') ) {
        this.renderSnippet();
      } else {
        this.renderHeading();
      }
      return this;
    },

    renderHeading: function() {
      this.$el.append(
        '<h1 class=' + this.model.get('size') + '>' + this.model.get("title") + '</h1>'
      );
    },

    renderImage: function() {
      this.$el
        .addClass('image')
        .append('<img src="' + this.model.get('image') + '">');
    },

    renderBullets: function() {
      var el = this.$el;
      el.addClass('bullets');
      if ( this.model.get('title') ) {
        this.renderHeading();
      }
      el.append([
          '<ul>',
            '<li>' + this.model.get('bullets').join('</li><li>'),
            '</li>',
          '</ul>'
        ].join(''))
    },

    renderQuote: function() {
      this.$el
        .addClass("quote")
        .append([
          '<figure>',
            '<blockquote>',
              this.model.get('quote'),
            '</blockquote>',
            '<figcaption>',
              '<cite>',
                this.model.get('cite'),
              '</cite>',
            '</figcaption>'
        ].join(''));
    },

    renderSnippet: function() {
      var self = this;
      var snippet = this.model.get('snippet');
      this.$el.addClass('snippet');

      if ( this.model.get('title') ) {
        this.renderHeading();
      }

      $.get(snippet, function(snippet) {
        self.$el
          .append( '<pre class="prettyprint">' + _.escape(snippet) + '</pre>' )
        prettyPrint();
      });

    }
  });

  return Slide;
});