import sinon from 'sinon';

export function noErrorsAllowed() {
    beforeEach(() => {
      sinon.stub(console, 'error');
    });
  
    afterEach(() => {
      sinon.assert.notCalled(console.error);
      console.error.restore();
    });
  }