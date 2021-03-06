define(['backbone', 'helpers', 'prettify'], function (Backbone, Helpers, Prettify) {
  var Slide = Backbone.View.extend({
    className: 'slide',

    render: function () {
      var contentType = this.getContentType();
      this['render' + Helpers.capitalize(contentType)]();
      return this;
    },

    getContentType: function() {
      if ( this.model.get('image') ) {
        return 'image';
      } else if ( this.model.get('bullets') ) {
        return 'bullets';
      } else if ( this.model.get('quote') ) {
        return 'quote';
      } else if ( this.model.get('snippet') ) {
        return 'snippet'
      } else {
        return 'heading';
      }
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

      if ( $.isPlainObject(snippet) ) {
        return _.each(snippet, function(snippetPath, heading) {
          self.setSnippet(snippetPath, heading);
        });
      }

      self.setSnippet(snippet);

    },

    setSnippet: function(snippetPath, heading) {
      var self = this;
      $.get(snippetPath, function(snippet) {
        if ( heading ) {
          self.$el.append( '<h1>' + heading + '</h1>' );
        }
        self.$el.append( '<pre class="prettyprint">' + _.escape(snippet) + '</pre>' );
        Prettify.prettyPrint();
      });

    }
  });

  return Slide;
});