var Camera = {
  DestinationType: {
    DATA_URL: null
  },
  PictureSourceType: {
    PHOTOLIBRARY: null
  },
  EncodingType: {
    JPEG: null
  }
};
var CameraPopoverOptions;
var mockData = (function() {
  
  function createFullEvent(idEvent) {
    
    return eventBuilder
      .setId(idEvent)
      .setCategory(categoryBuilder.omit("interests").build())
      .setType(eventTypeBuilder.build())
      .setUserOrganizer(userBuilder.omit("events").build())
      .setPerks([
        perkBuilder
        .setTasks([
          taskBuilder.build(),
          taskBuilder.build()
        ])
        .build(),
        perkBuilder
        .setTasks([
          taskBuilder.build(),
          taskBuilder.build()
        ])
        .build(),
      ])
      .build();
  }
  
  return {
    failed: failed,
    categoryService: {
      allCategories: allCategories,
      getCategory: getCategory
    },
    userInterestService:{
      bulkUserInterest: bulkUserInterest
    },
    userService: {
      login: login,
      home: home,
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
      createPerk: createPerk,
      deletePerk: deletePerk,
      editPerkPatch: editPerkPatch,
      editPerkPut: editPerkPut
    },
    imgurService: {
      uploadImage: uploadImage
    },
    eventTypeService: {
      allEventTypes: allEventTypes,
      getEventType: getEventType
    },
    taskSponsorService: {
      getAllTasks: getAllTasks,
      getTask: getTask,
      createTask: createTask,
      editPutTask: editPutTask,
      editPatchTask: editPatchTask,
      deleteTask: deleteTask
    },
    
    eventService:{
      allEvents: allEvents,
      getEvent: getEvent,
      createEvent: createEvent,
      deleteEvent: deleteEvent,
      editEventPatch: editEventPatch,
      editEventPut: editEventPut
    }
  }

  function failed(){
    return {
      message: "message"
    }
  }
  
  function bulkUserInterest() {
    return {
      inserted: [],
      noInserted: []
    }
  }

  function login( type ){
    
    var response = {
      rating: null,
      success: true,
      token: null,
    };
    
    if(type == "0"){ //Is an Organizer
      response.user = userBuilder
      .setType("0")
      .setEvents([
        createFullEvent(1),
        createFullEvent(2),
        createFullEvent(3)
      ])
      .setSponzorshipLikeOrganizer([
        sponsorshipBuilder.build(),
        sponsorshipBuilder.build(),
        sponsorshipBuilder.build(),
      ])
      .omit("sponzorships")
      .build();
    }else{ //Is an Sponsor
      response.events = [
        createFullEvent(1),
        createFullEvent(2),
        createFullEvent(3)
      ];
      response.user = userBuilder
      .setType("1")
      .omit(["events","sponzorships_like_organizer"])
      .setSponzorships([
        sponsorshipBuilder.build(),
        sponsorshipBuilder.build(),
        sponsorshipBuilder.build(),
      ])
      .build();
    }
    
    return response;
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
              ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
            }                                                         
          ]
        }
      }
    }
  }
  
  function home(type){
    var data = {};
    
    if(type == "0"){ //Is an Organizer
      data.user = userBuilder
      .setType("0")
      .setEvents([
        createFullEvent(1),
        createFullEvent(2),
        createFullEvent(3)
      ])
      .setSponzorshipLikeOrganizer([
        sponsorshipBuilder.setEvent(eventBuilder.build()).build(),
      ])
      .omit("sponzorship")
      .build();
    }else{ //Is an Sponsor
      data.events = [
        createFullEvent(1),
        createFullEvent(2),
        createFullEvent(3)
      ];
      data.user = userBuilder
      .setType("1")
      .omit(["events","sponzorships_like_organizer"])
      .setSponzorships([
        sponsorshipBuilder.setEvent(eventBuilder.build()).build(),
      ])
      .build();
    }
    
    return {
      data: data
    };
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
      User:{
        id: "1", 
        email: "mail@domain.com",
        age: "12",
        comunity_size: "0",
        image: 'http://i.imgur.com/SpKEBB5.jpg'
      },
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
        sponsorshipBuilder.setId("1").omit("SponzorEvent").build(),
        sponsorshipBuilder.setId("2").omit("SponzorEvent").build(),
      ],
      success: true
    }
  }

  function getSponzorship(){
    return {
      Sponzorship: sponsorshipBuilder.setId("1").build()
    }
  }

  function createSponzorship(){
    return {
      Sponzorship: sponsorshipBuilder.setId("1").omit("SponzorEvent").build(),
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
      Sponzorship: sponsorshipBuilder.setId("1").omit("SponzorEvent").build(),
      message: "Updated",
      warnings: []
    }
  }

  function editSponzorshipPut(){
    return {
      Sponzorship: sponsorshipBuilder.setId("1").omit("SponzorEvent").build(),
      message: "Updated",
    }
  }
  
  function allPerkTasks(){
    return {
      PerkTasks: [
        perkTaskBuilder.build(),
        perkTaskBuilder.build(),
      ],
      success: true
    }
  }

  function getPerkTask(){
    return {
      data: perkTaskBuilder.build()
    }
  }

  function createPerkTask(){
    return {
      PerkTask: perkTaskBuilder.omit("PerkTask").build(),
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
      PerkTask: perkTaskBuilder.omit("PerkTask").build(),
      message: "Updated",
      warnings: []
    }
  }

  function editPerkTaskPut(){
    return {
      PerkTask: perkTaskBuilder.omit("PerkTask").build(),
      message: "Updated",
    }
  }

  function getPerkTaskByOrganizer(){
    return {
     PerkTasks: [
        perkTaskBuilder.build(),
        perkTaskBuilder.build(),
      ],
      success: true
    }
  }
  
  function allPerks(){
    return {
      Perk: [
        perkBuilder.setId("1").build(),
        perkBuilder.setId("2").build(),
      ],
      success: true
    }
  }
  

  function createPerk(){
    return {
      Perk: perkBuilder.setId("1").build(),
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

  function allEventTypes(){
    return {
      eventTypes: [
        {
          description: "Give us your money",
          id: "1",
          lang: "en",
          name: "Charity"
        },
        {
          description: "Recruitment",
          id: "2",
          lang: "en",
          name: "Recruitment"
        }
      ]
    }
  }

  function getEventType(){
    return {
      data: {
        eventTypes: {
          description: "Give us your money",
          events: [],
          id: "1",
          lang: "en",
          name: "Charity"
        }
      }
    }
  }
  

  function getAllTasks(){
    return {
      success: true,
      TasksSponzor: [
        taskSponsorBuilder.setId("1").build(),
        taskSponsorBuilder.setId("2").build(),
      ]
    }
  }

  function getTask(){
    return {
      data: taskSponsorBuilder.setId("1").build(),
      success: true,
    }
  }

  function createTask(){
    return {
      message: "Inserted",
      TaskSponzor: taskSponsorBuilder.setId("1").build(),
      PerkSponzor: {
        sponzor_id: "1",
        perk_id: "1",
        event_id: "1",
        task_id: "1",
        sponzorship_id: "1",
        organizer_id: "2",
        id: 2
      },
    }
  }

  function editPatchTask(){
    return {
      message: "Updated",
      TaskSponzor: taskSponsorBuilder.setId("1").build(),
    }
  }

  function editPutTask(){
    return {
      message: "Updated",
      warnings: [],
      TaskSponzor: taskSponsorBuilder.setId("1").build(),
    }
  }

  function deleteTask(){
    return {
      message: "Deleted"
    }
  }

  function allCategories() {
    return {
      categories: [
        categoryBuilder.setId(1)
        .setInterests([
          interestBuilder.build(),
          interestBuilder.build(),
        ]).build(),
        categoryBuilder.setId(2)
        .setInterests([
          interestBuilder.build(),
          interestBuilder.build(),
        ]).build(),
      ],
      success: true
    }
  }

  function getCategory(){
    return {
      data: {
        category: categoryBuilder.setId(1)
        .setInterests([
          interestBuilder.build(),
          interestBuilder.build(),
        ]).build(),
      }
    }
  }

  function allEvents(){
    return {
      data: {
        events: [
          {
            category: "1",
            description: "",
            ends: "2016-01-30 08:54:00",
            id: "1002",
            image: "event_dummy.png",
            lang: "en",
            location: "Medellin Colombia",
            location_reference: "referenceafsddf",
            privacy: "0",
            starts: "2016-01-30 03:54:00",
            title: "My Second Event",
            type: "1",
            user_organizer: {
              image: ''
            },
          },
          {
            category: "1",
            description: "Una intro",
            ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
            id: "1004",
            image: "http://i.imgur.com/t8YehGM.jpg",
            lang: "en",
            location: "Bogota",
            location_reference: "referencia",
            privacy: "1",
            starts: "2016-01-30 17:45:00",
            title: "Ionic 102 - Workshop",
            type: "1",
            user_organizer: {
              image: ''
            },
          }
        ],
      },
      success: true
    }
  }
  
  function getEvent(){
    return {
        event: {
          id: "1",
          title: "My Second Event",
          location: "Medellin Colombia",
          ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
          starts: "2016-01-31 09:57:00",
          image: '',
          user_organizer: {
            image: ''
          },
          category: {},
          type: {},
          perks: [
            {
              id: "3",
              id_event: "1002",
              kind: "A",
              reserved_quantity: "0",
              total_quantity: "2",
              usd: "10",
              tasks: []
            },
            {
              id: "14",
              id_event: "1002",
              kind: "C",
              reserved_quantity: "0",
              total_quantity: "4",
              usd: "8",
              tasks: []
            }
          ],
          sponzor_tasks: [],
          sponzorship: [
            {
              cause: "test",
              event_id: "1002",
              id: "30",
              organizer_id: "1003",
              perk_id: "3",
              sponzor_id: "1002",
              status: "0"
            }
          ]
        }
      }
  }

  function createEvent(){
    return {
      event: {
        category: "1",
        description: "Una prueba",
        ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
        image: "http://i.imgur.com/t8YehGM.jpg",
        lang: "es",
        location: "event",
        location_reference: "referencia",
        privacy: "1",
        starts: "2010-01-01 00:00:00",
        title: "Test Event",
        type: "1",
        user_organizer: {
          image: ''
        },
      },
      message: "Inserted"
    }
  }

  function deleteEvent(){
    return {
      message: "Deleted"
    }
  }

  function editEventPatch(){
    return {
      event: {
        category: "1",
        description: "Una prueba",
        ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
        id: "1045",
        image: "http://i.imgur.com/t8YehGM.jpg",
        lang: "es",
        location: "event",
        location_reference: "referencia",
        privacy: "1",
        starts: "2010-01-01 00:00:00",
        title: "Test Event 2",
        type: "1",
        message: "Updated",
        user_organizer: {
          image: ''
        },
      },
      warnings: []
    }
  }

  function editEventPut(){
    return {
      event: {
        category: "1",
        description: "Una prueba",
        ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
        id: "1045",
        image: "http://i.imgur.com/t8YehGM.jpg",
        lang: "es",
        location: "event",
        location_reference: "referencia",
        privacy: "1",
        starts: "2010-01-01 00:00:00",
        title: "Test Event 2",
        type: "1",
        message: "Updated",
        user_organizer: {
          image: ''
        },
      }
    }
  }
})();