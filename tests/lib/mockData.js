var mockData = (function() {

  return {
    UserService: {
      login: login,
      getUser: getUser
    }
  };

  function login() {
    return {
      "success":true,
      "user":
        {
          "id":"1003",
          "name":"sponzorme Organizer",
          "email":"organizer@sponzor.me",
          "activated":"1",
          "activation_code":"",
          "activated_at":"",
          "last_login":"",
          "persist_code":"",
          "reset_password_code":"",
          "company":"Sponzorme",
          "sex":"0",
          "age":"63",
          "custom_status":"0",
          "login_code":"",
          "login_valid_until":"",
          "lang":"en",
          "image":"https:\/\/s3-us-west-2.amazonaws.com\/sponzormewebappimages\/N21oaFVqQ0IxNDQ5NjcyNjc2OTg2R0VuVXZxYTYPh9rJlxc.png",
          "description":"test 123 55555 6",
          "eventbriteKey":"",
          "meetupRefreshKey":"",
          "comunity_size":"523",
          "location":"Colombia",
          "location_reference":"",
          "demo":"1",
          "type":"0",
          "status":"0",
          "phone":null,
          "logo":null,
          "website":null,
          "pitch":null,
          "newsletter":null
        },
      "token":null
    }
  }

  function getUser(){
    return {
      "data":{
        "user": {
          "id": "1",
          "email": "organizer@sponzor.me",
          "events": [],
          "interests": [],
          "perk_tasks": [],
          "sponzorships": [],
          "sponzorships_like_organizer": [],
          "tasks_sponzor_like_organizer": [],
          "tasks_sponzor_like_sponzor": [],
        },
        "interests":[]
      }
    }
  }

})();