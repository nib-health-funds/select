var click = require('@jameslnewell/click');
var assert = require('assert');
var select = require('..');

var element;

function el(selected) {
  var options = [];
  for (var i=0; i<4; ++i) {
    var input = '<option value='+String.fromCharCode(65+i)+' '+(selected === String.fromCharCode(65+i) ? 'selected ' : '')+'>'+String.fromCharCode(65+i)+'</option>';
    options.push(input)
  }
  var el = element = document.createElement('select');
  el.innerHTML = options.join();
  document.body.appendChild(el);
  return el;
}

describe('select', function() {

  afterEach(function() {
    if (element) {
      document.body.removeChild(element);
      element = null;
    }
  });

  describe('constructor', function() {

    it('should create a new instance when called as a constructor', function() {
      var rg = new select();
      assert(rg instanceof select);
    });

    it('should create a new instance when called as a fn', function() {
      var rg = select();
      assert(rg instanceof select);
    });

    it('should create a new instance with an options object', function() {

    });

    it('should create a new instance with an element', function() {

    });

  });

  describe('.values', function() {

    it('should be an array', function() {
      var rg = new select(el());
      assert.deepEqual(rg.values, ['A', 'B', 'C', 'D']);
    });

  });

  describe('.value', function() {

    it('should be the first value in the list', function() {
      var rg = new select(el());
      assert.equal(rg.value, 'A');
    });

    it('should be C', function() {
      debugger;
      var rg = new select(el('C'));
      assert.equal(rg.value, 'C');
    });

  });

  describe('.select(null)', function() {

    it('should throw an error', function() {
      assert.throws(function() {
        var rg = new select(el());
        rg.select(null);
      });
    });

  });

  describe('.select(index)', function() {

    it('should throw an error when the index is out of range', function() {
      var rg = new select(el());

      assert.throws(function() {
        rg.select(-1);
      });

      assert.throws(function() {
        rg.select(4);
      });

    });

    it('should select the 2nd item', function() {
      var rg = new select(el());

      assert.equal(rg.value, 'A');
      rg.select(1);
      assert.equal(rg.value, 'B');

    })

  });

  describe('.select(value)', function() {

    it('should throw an error when the value is not valid', function() {
      var rg = new select(el());

      assert.throws(function() {
        rg.select('abcde');
      });

    });

    it('should select the 2nd item', function() {
      var rg = new select(el());

      assert.equal(rg.value, 'A');
      rg.select('B');
      assert.equal(rg.value, 'B');

    });

  });

  describe('<>changed', function() {

    it('should be emitted when I call .select(value)', function(done) {
      var rg = new select(el());
      rg
        .on('changed', function(value, prev) {
          assert.equal(value, 'A');
          assert.equal(prev, null);
          done();
        })
        .select('A')
      ;
    });


    it.skip('should be emitted when I select an option', function(done) {
      debugger;
      var rg = new select(el());
      rg
        .on('changed', function(value, prev) {
          assert.equal(value, 'A');
          assert.equal(prev, null);
          done();
        })
      ;
      click(rg.el.options[0]);
    });

  });

});