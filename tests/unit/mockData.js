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
    },
    perkTaskService:{
      allPerkTasks: allPerkTasks,
      getPerkTask: getPerkTask,
      createPerkTask: createPerkTask,
      deletePerkTask: deletePerkTask,
      editPerkTaskPatch: editPerkTaskPatch,
      editPerkTaskPut: editPerkTaskPut,
      getPerkTaskByOrganizer: getPerkTaskByOrganizer
    },
    perkService: {
      allPerks: allPerks,
      getPerk: getPerk,
      createPerk: createPerk,
      deletePerk: deletePerk,
      editPerkPatch: editPerkPatch,
      editPerkPut: editPerkPut
    },
    imgurService: {
      uploadImage: uploadImage
    }
  }

  function failed(){
    return {
      message: "message"
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
  
  function allPerkTasks(){
    return {
      PerkTasks: [
        {
          description: "asas sdsd",
          eventEnds: "2016-01-31 09:57:00",
          eventStart: "2016-01-30 03:54:00",
          eventTitle: "My Second Event",
          event_id: "1002",
          id: "11",
          perk_id: "3",
          status: "1",
          title: "Prueba",
          type: "1",
          user_id: "1002"
        },
        {
          description: "asas sdsd",
          eventEnds: "2016-01-31 09:57:00",
          eventStart: "2016-01-30 03:54:00",
          eventTitle: "My Second Event",
          event_id: "1002",
          id: "11",
          perk_id: "3",
          status: "1",
          title: "Prueba",
          type: "1",
          user_id: "1002"
        },
      ],
      success: true
    }
  }

  function getPerkTask(){
    return {
      data: {
        Event: {},
        Perk: {},
        PerkTask: {},
        User: {}
      }
    }
  }

  function createPerkTask(){
    return {
      PerkTask: {
        description: "Bla bla",
        event_id: "1018",
        id: 35,
        perk_id: "18",
        status: "0",
        title: "Tarea",
        type: "0",
        user_id: "1007",
      },
      message: "Inserted"
    }
  }

  function deletePerkTask(){
    return {
      message: "Deleted"
    }
  }

  function editPerkTaskPatch(){
    return {
      PerkTask:{},
      message: "Updated",
      warnings: []
    }
  }

  function editPerkTaskPut(){
    return {
      PerkTask:{},
      message: "Updated",
    }
  }

  function getPerkTaskByOrganizer(){
    return {
      PerkTasks: [
        {
          description: "Bla bla",
          eventEnds: "2016-01-07 19:57:00",
          eventStart: "2016-01-07 14:57:00",
          eventTitle: "evento de prueba fhh",
          event_id: "1018",
          id: "36",
          perk_id: "18",
          status: "0",
          title: "Tarea",
          type: "0",
          user_id: "1007"
        },
        {
          description: "Bla bla",
          eventEnds: "2016-01-07 19:57:00",
          eventStart: "2016-01-07 14:57:00",
          eventTitle: "evento de prueba fhh",
          event_id: "1018",
          id: "36",
          perk_id: "18",
          status: "0",
          title: "Tarea",
          type: "0",
          user_id: "1007"
        }
      ],
      success: true
    }
  }
  
  function allPerks(){
    return {
      Perk: [
        {
          id: "3",
          id_event: "1002",
          kind: "A",
          reserved_quantity: "0",
          total_quantity: "2",
          usd: "10"
        },
        {
          id: "4",
          id_event: "1004",
          kind: "Food",
          reserved_quantity: "0",
          total_quantity: "1",
          usd: "202"
        },
      ],
      success: true
    }
  }

  function getPerk(){
    return {
      data: {
        Event: {},
        Perk: {},
        SponzorTasks: [],
        Tasks: [
          {
            description: "asas sdsd",
            event_id: "1002",
            id: "11",
            perk_id: "3",
            status: "1",
            title: "Prueba",
            type: "1",
            user_id: "1002"
          },
          {
            description: "as",
            event_id: "1002",
            id: "15",
            perk_id: "3",
            status: "0",
            title: "UNa tarea",
            type: "1",
            user_id: "1002"
          }
        ],
      }
    }
  }

  function createPerk(){
    return {
      Perk: {
        id: 55,
        id_event: "1018",
        kind: "Food",
        reserved_quantity: "0",
        total_quantity: "1",
        usd: "1"
      },
      message: "Inserted"
    }
  }

  function deletePerk(){
    return {
      message: "Deleted"
    }
  }

  function editPerkPatch(){
    return {
      Perk: {},
      message: "Updated",
      warnings: []
    }
  }

  function editPerkPut(){
    return {
      Perk: {},
      message: "Updated",
    }
  }

  function uploadImage(){
    return {
      data: {
        link : 'http://i.imgur.com/SpKEBB5.jpg'
      }
    }
  }
  

  
})();