describe('Controller: EventDetailTasksSponzorController', function(){

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

	/*
	it('Should define a array of tasks_sponsors', function(){
		chai.assert.isDefined(controller.tasks_sponsors);
	});

	it('Should define a array of tasks_organizer', function(){
		chai.assert.isDefined(controller.tasks_organizer);
	});*/
});
