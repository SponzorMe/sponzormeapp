describe('when using a AddEventController', function(){

	//scope
	var controller = {};
	var scope = {};

	beforeEach(function(){
		module('app');
	});

	beforeEach(function(){
		inject(function($controller){
			controller = $controller('AddEventController' , {$scope : scope});
		});
	});

	it('should define a createEvent function', function(){
		expect(controller.createEvent).toBeDefined();
	});
});