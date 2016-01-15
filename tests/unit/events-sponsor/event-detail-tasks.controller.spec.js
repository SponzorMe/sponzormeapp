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

	it('Should define a array of perks_tasks', function(){
		chai.assert.isDefined(controller.perks_tasks);
	});

	it('Should define a array of perks_sponsorships', function(){
		chai.assert.isDefined(controller.perks_sponsorships);
	});
});
