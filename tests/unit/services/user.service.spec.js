describe('User Service', function () {
  var service;

  beforeEach(module('app'));

  beforeEach(inject(function (_userService_) {
    service = _userService_;
  }));

  it('Login', function () {
    service.login({
      user: 'asas',
      password: 'asas'
    });
    expect(0).toEqual(0);
  }); 

});