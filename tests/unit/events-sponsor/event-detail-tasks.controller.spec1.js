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

	it('1. should define a array of perks_tasks', function(){
		expect(controller.perks_tasks).toBeDefined();
	});

	it('2. should define a array of perks_sponsorships', function(){
		expect(controller.perks_sponsorships).toBeDefined();
	});
});
