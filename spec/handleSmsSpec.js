const subject = require('../src/handler/handleSms');

describe('linkReplacer function', () => {

  let linkReplacer, replacerSpy;

  beforeEach(() => {
    replacerSpy = jasmine.createSpy('linkreplacer');
    linkReplacer = subject.initialiseLinkReplacer(replacerSpy);
  });

  it('should call the replacer', done => {
    replacerSpy.and.returnValue(Promise.resolve(''));
    linkReplacer('http://www.test.com/')
      .then(replacement => {
        expect(replacement).toBe('');
        expect(replacerSpy).toHaveBeenCalled();
        done();
      }, done.fail);
  });

  it('should replace link', done => {
    replacerSpy.and.returnValue(Promise.resolve('..'));
    linkReplacer('Test http://www.test.com/ and http://www.test.com.au/')
      .then(replacement => {
        expect(replacement).toBe('Test .. and ..');
        done();
      }, done.fail);
  });

  it('should just return message if failure', done => {
    replacerSpy.and.returnValue(Promise.reject());
    linkReplacer('Test http://www.test.com/ and http://www.test.com.au/')
      .then(replacement => {
        expect(replacement).toBe('Test http://www.test.com/ and http://www.test.com.au/');
        done();
      }, done.fail);
  });

  it('should handle text without link', done => {
    linkReplacer('Test http:// and https:// ')
      .then(replacement => {
        expect(replacement).toBe('Test http:// and https:// ');
        expect(replacerSpy).not.toHaveBeenCalled();
        done();
      }, done.fail);
  })
});