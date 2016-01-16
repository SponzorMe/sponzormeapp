var mockData = (function() {

  return {
    failed: failed,
    userInterestService:{
      createUserInterestSuccess: createUserInterestSuccess
    },
    userService: {
      login: login,
      getUser: getUser,
      createUser: createUser,
      deleteUser: deleteUser,
      editUserPatch: editUserPatch,
      editUserPut: editUserPut,
      forgotPassword: forgotPassword,
      invitedUser: invitedUser
    },
    sponsorshipService: {
      allSponsorships: allSponsorships,
      getSponzorship: getSponzorship,
      sponzorshipByOrganizer: sponzorshipByOrganizer,
      sponzorshipBySponzor: sponzorshipBySponzor,
      createSponzorship: createSponzorship,
      deleteSponzorship: deleteSponzorship,
      editSponzorshipPatch: editSponzorshipPatch,
      editSponzorshipPut: editSponzorshipPut
    }
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

  function login(){
    return {
      rating: null,
      success: true,
      token: null,
      user: {
        id: "1",
        email: "mail@domain.com"
      }
    }
  }

  function getUser(){
    return {
      data: {
        user: {
          id: "1",
          email: "mail@domain.com",
          events: [
            {
              image: "event_dummy.png",
              starts: "2016-01-09 15:00:00",
              ends: "2016-01-09 15:00:00"
            },
            {
              image: "https://staging.sponzor.me/#/event/1",
              starts: "2016-01-09 15:00:00",
              ends: "2016-01-09 15:00:00"
            }
          ]
        }
      }
    }
  }

  function createUser(){
    return {
      User:{
        created_at: "2016-01-15 23:29:52",
        email: "nico@as.co",
        id: 1008,
        lang: "en",
        name: "Nicolas",
        type: "1"
      },
      message: "Inserted"
    }
  }

  function deleteUser(){
    return {
      message: "Deleted"
    }
  }

  function editUserPatch(){
    return {
      User:{},
      message: "Updated",
      warnings: []
    }
  }

  function editUserPut(){
    return {
      User:{},
      message: "Updated",
    }
  }

  function forgotPassword(){
    return {
      code: "200",
      message: "Reset password Link sent",
      resetLink: "https://localhost:9000/#/reset/1c7c0dfc385dfea20f72551ab5e04cb5"
    }
  }

  function invitedUser(){
    return {
      message: "Email Sent",
      code: "200"
    }
  }

  function allSponsorships(){
    return {
      SponzorsEvents: [
        {
          cause: "asas",
          event_id: "1018",
          id: "12",
          organizer_id: "1003",
          perk_id: "18",
          sponzor_id: "1002",
          status: "3"
        },
        {
          cause: "asas",
          event_id: "1018",
          id: "12",
          organizer_id: "1003",
          perk_id: "18",
          sponzor_id: "1002",
          status: "3"
        }
      ],
      success: true
    }
  }

  function getSponzorship(){
    return {
      data: {
        Event: {},
        Organizer: {},
        Perk: {},
        Sponzor: {},
        SponzorEvent: {},
        Tasks: []
      }
    }
  }

  function sponzorshipByOrganizer(){
    return {
      SponzorsEvents: [
        {
          starts: "2016-01-09 15:00:00",
          ends: "2016-01-09 15:00:00"
        },
        {
          starts: "2016-01-09 15:00:00",
          ends: "2016-01-09 15:00:00"
        }
      ]
    }
  }

  function sponzorshipBySponzor(){
    return {
      SponzorsEvents: [
        {
          starts: "2016-01-09 15:00:00",
          ends: "2016-01-09 15:00:00"
        },
        {
          starts: "2016-01-09 15:00:00",
          ends: "2016-01-09 15:00:00"
        }
      ]
    }
  }

  function createSponzorship(){
    return {
      Sponzorship: {
        cause: "YOLO",
        event_id: "1018",
        id: 31,
        organizer_id: "1003",
        perk_id: "18",
        sponzor_id: "1002",
        status: "0"
      },
      message: "Inserted"
    }
  }

  function deleteSponzorship(){
    return {
      message: "Deleted"
    }
  }

  function editSponzorshipPatch(){
    return {
      Sponzorship:{},
      message: "Updated",
      warnings: []
    }
  }

  function editSponzorshipPut(){
    return {
      Sponzorship:{},
      message: "Updated",
    }
  }
  

  

  function failed(){
    return {
      message: "message"
    }
  }

  
})();