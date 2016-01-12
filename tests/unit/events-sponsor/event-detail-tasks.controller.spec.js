describe('when using a EventDetailTasksSponzorController', function(){

	//scope
	var controller = {};
	var scope = {};

	beforeEach(function(){
		module('app');
	});

	beforeEach(function(){
		inject(function($controller){
			controller = $controller('EventDetailTasksSponzorController' , {$scope : scope});
		});
	});

	it('1. should define a array of tasks', function(){
		expect(controller.tasks).toBeDefined();
	});
});