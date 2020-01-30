var uut = require('../');

describe('access.js', function() {
  it('should export a `isAllowed` method', function() {
    expect(uut.isAllowed).toBeDefined();
    expect(typeof uut.isAllowed).toEqual('function');
  });

  describe('isAllowed()', function() {
    it('should return true if required right is empty string', function() {
      var bool = uut.isAllowed(['some'], '');
      expect(bool).toBe(true);
    });

    it('should return true if required right is undefined', function() {
      var bool = uut.isAllowed(['some']);
      expect(bool).toBe(true);
    });

    it('should return true for ([*], "foo")', function() {
      var bool = uut.isAllowed(['*'], 'foo');
      expect(bool).toBe(true);
    });

    it('should acceppt array for requires', function() {
      var bool = uut.isAllowed(['x'], ['y', 'x']);
      expect(bool).toBe(true);
    });

    it('should return true for ([x], "x.y")', function() {
      var bool = uut.isAllowed(['x'], 'x.y');
      expect(bool).toBe(true);
    });

    it('should handle null values', function() {
      var bool = uut.isAllowed();
      expect(bool).toBe(true);
    });

    it('should handle empty has and undefined required', function() {
      var bool = uut.isAllowed([]);
      expect(bool).toBe(true);
    });

    it('should handle empty has and something required', function() {
      var bool = uut.isAllowed([''], 'blah.blubb');
      expect(bool).toBe(false);
    });

    it('should handle undef has and something required', function() {
      var bool = uut.isAllowed(undefined, 'blah.blubb');
      expect(bool).toBe(false);
    });

    it('should handle [undef] has and something required', function() {
      var bool = uut.isAllowed([undefined], 'blah.blubb');
      expect(bool).toBe(false);
    });

    //
    // TODO
    // uut.isAllowed(['x', 'y'], ['a', ['x','y']])
    // this means: user needs (right a) OR (right x AND y)
    //
    // uut.isAllowed(['x', 'y'], ['a', ['x', 'y']]) => true
    // uut.isAllowed(['x'], ['a', ['x', 'y']])      => false
    // uut.isAllowed(['a'], ['a', ['x', 'y']])      => true
    //
  });

  describe('in production issues/tests', () => {
    it('test #1: is Allowed should return true', () => {
      const has = ['filebrowser.local.read'];

      const needs = 'filebrowser.local.read.jobs.a1.job';

      const result = uut.isAllowed(has, needs);

      expect(result).toBe(true);
    });

    it('test #2: is Allowed should return true', () => {
      const has = ['filebrowser.local.read'];

      const needs = 'filebrowser.local.read.jetflash_transcend_8gb_1';

      const result = uut.isAllowed(has, needs);

      expect(result).toBe(true);
    });

    it('test #3: work with multiple required rights and subrights', () => {
      const has = ['a.b'];
      const needs = ['a.a', 'a.b'];
      const result = uut.isAllowed(has, needs);
      expect(result).toBe(true);
    });
  });
});
