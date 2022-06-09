const assert = require('assert');
const Senfi = require('../lib/senfi');
const request = require('supertest');

describe('senfi', function() {
  it('should be callable', function() {
    assert.strictEqual(typeof Senfi, 'function');
  })

  it('should be instantiated', function() {
    var senfi = Senfi();
    assert.strictEqual(typeof senfi, 'object');
  })
});

describe('senfi.initialize()', function() {
  it('valid credentials', function() {
    var senfi = Senfi();
    return senfi.initialize('Simulate01', '19cb6de1-9ab9-4a65-9c83-a3e507686a27')
    .then((res) => {
      assert.strictEqual(res.success, true);
    });
  });

  it('no credentials', function() {
    var senfi = Senfi();
    return senfi.initialize()
    .catch((res) => {
      assert.strictEqual(res.success, false);
      assert.strictEqual(res.errcode, 'unauthorized');
    })
  });

  it('invalid credentials', function() {
    var senfi = Senfi();
    return senfi.initialize('foo', 'bar')
    .catch((res) => {
      assert.strictEqual(res.success, false);
      assert.strictEqual(res.errcode, 'unauthorized');
    })
  });

  it('empty config', function() {
    var senfi = Senfi();
    return senfi.initialize('Simulate01', '19cb6de1-9ab9-4a65-9c83-a3e507686a27', {})
    .then((res) => {
      assert.strictEqual(res.success, true);
    });
  });
});
