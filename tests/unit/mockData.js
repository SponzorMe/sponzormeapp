var mockData = (function() {

	return {
		userInterestService:{
			createUserInterestSuccess: createUserInterestSuccess
		},
		failed: failed
	}
  
  function createUserInterestSuccess(){
  	return {
			UserInterest: {
				interest_id: "1",
				user_id: "1007",
				id: 10
			},
			message: "Inserted"
  	}
  }

  function failed(){
  	return {
  		message: "message"
  	}
  }

  
})();