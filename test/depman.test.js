'use strict';

let errors = require('../src/errors');
let depman = require('../');
let myapp  = depman();

describe('depman', () => {
  it('creates app dep manager', () => {
    assert.property(myapp, 'register');
  });

  describe('#vendor', () => {
    it('trow error if no name provided', () => {
      expect(function() {
        myapp.vendor();
      }).to.throw(errors.NameError);
    });

    it('trow error if no job provided', () => {
      expect(function() {
        myapp.vendor('foo');
      }).to.throw(errors.MissingJobError);
    });
    
    it('suscribes a vendor on app', () => {
      // myapp.vendor('vendor', require('./mocks/vendor'));
      const vendorStub = sinon.spy();
      myapp.vendor('vendor', vendorStub);
      myapp.register('foo', ['vendor', (vendor) => {
        vendor();
        expect(vendorStub.calledOnce);
      }]);
    });
  });

  // describe('#register', () => {
  //   it('trow error if no name provided', () => {
  //     expect(function() {
  //       myapp.register();
  //     }).to.throw(errors.NameError);
  //   });
  //
  //   it('trow error if no job provided', () => {
  //     expect(function() {
  //       myapp.register('foo');
  //     }).to.throw(errors.MissingJobError);
  //   });
  //
  //   it('registers any service', () => {
  //     const bar = sinon.stub();
  //     myapp.register('bar', bar);
  //     myapp.register('foo', ['bar', (bar) => {
  //       bar();
  //     }]);
  //    
  //   });
  // });
});