var View = require('view');

module.exports = View.extend({

  events: {
    'change': 'onClick'
  },

  elements: {
    'option': 'all:options'
  },

  /**
   * Construct the view
   * @param   {Object|HTMLElement} options
   * @returns {module.exports}
   */
  construct: function(options) {

    if (!(this instanceof View)) {
      return new module.exports(options);
    }

    if (options instanceof HTMLElement) {
      options = {el: options};
    }

    View.call(this, options);
  },

  /**
   * Select an option
   * @param   {string|number|null} value
   * @returns {exports}
   */
  select: function(value) {

    if (value === null) {

      throw new RangeError();

    } else if (typeof value === 'number') {

      //select the input
      if (value >= 0 && value < this.options.length) {
        this.options[value].selected = true;
      } else {
        throw new RangeError();
      }

      //fire the events
      this.onClick({delegateTarget: this.options[value]});

    } else {

      //select the input
      var found = false;
      for (var i=0; i<this.options.length; ++i) {
        if (this.options[i].value === value) {
          this.options[i].selected = true;
          found = true;
          break;
        }
      }

      if (!found) {
        throw new RangeError();
      }

      //fire the events
      this.onClick({delegateTarget: this.options[i]});

    }
    return this;
  },

  /**
   * Handle change events
   * @param event
   */
  onClick: function(event) {

    if (this.previous !== this.value) {
      this.emit('changed', this.value, this.previous);
      this.previous = this.value;
    }

  }

});

Object.defineProperties(module.exports.prototype, {

  /**
   * Get the selected value
   * @returns {string|null}
   */
  value: {
    get: function() {
      return this.el.value;
    }
  },

  /**
   * Get the values
   * @returns {Array.<string>}
   */
  values: {
    get: function() {
      return Array.prototype.map.call(this.options, function(option) {
        return option.value;
      });
    }
  }

});