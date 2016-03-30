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
          taskBuilder.setStatus("0").build(),
          taskBuilder.setStatus("0").build()
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
      createUserInterest: createUserInterest,
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
  
  function  createUserInterest() {
    return {
      data: {
        UserInterest: {}
      }
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
      user: {}
    };
    
    
    if(type == "0"){ //Is an Organizer
      response.user = userBuilder
      .setEvents([
        createFullEvent("1"),
        createFullEvent("2"),
        createFullEvent("3")
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
        createFullEvent("1"),
        createFullEvent("2"),
        createFullEvent("3")
      ];
      response.user = userBuilder
      .setSponzorships([
        sponsorshipBuilder.build(),
        sponsorshipBuilder.build(),
        sponsorshipBuilder.build(),
      ])
      .omit(["events","sponzorships_like_organizer"])
      .build();
    }
    
    return response;
  }

  function getUser(){
    return {
      data: user_organizer.setEvents([
        eventBuilder.build()
      ]).build()
    }
  }
  
  function home(type){
    
    var response = {
      rating: null,
      success: true,
      token: null,
      user: {}
    };
    
    if(type == "0"){ //Is an Organizer
      response.user = userBuilder
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
      response.events = [
        createFullEvent(1),
        createFullEvent(2),
        createFullEvent(3)
      ];
      response.user = userBuilder
      .omit(["events","sponzorships_like_organizer"])
      .setSponzorships([
        sponsorshipBuilder.setEvent(eventBuilder.build()).build(),
      ])
      .build();
    }
    
    return {
      data: response
    };
  }

  function createUser(){
    return {
      User: userBuilder.setId("1").build(),
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
      User: userBuilder.setId("1").build(),
      message: "Updated",
      warnings: []
    }
  }

  function editUserPut(){
    return {
      User: userBuilder.setId("1").build(),
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
      Sponzorship: sponsorshipBuilder.setId("1").setSponzor({
        image: ""
      }).build()
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
      Sponzorship: sponsorshipBuilder.setId("1").setSponzor({
        image: ""
      }).omit("SponzorEvent").build(),
      message: "Updated",
      warnings: []
    }
  }

  function editSponzorshipPut(){
    return {
      Sponzorship: sponsorshipBuilder.setId("1").setSponzor({
        image: ""
      }).omit("SponzorEvent").build(),
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
        eventTypeBuilder.setId("1").build(),
        eventTypeBuilder.setId("1").build(),
      ]
    }
  }

  function getEventType(){
    return {
      data: {
        eventTypes: eventTypeBuilder.setId("1").build()
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
        categoryBuilder.setId("1")
        .setInterests([
          interestBuilder.omit("id").build(),
          interestBuilder.omit("id").build(),
        ]).build(),
        categoryBuilder.setId("2")
        .setInterests([
          interestBuilder.omit("id").build(),
          interestBuilder.omit("id").build(),
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
          interestBuilder.omit("id").build(),
          interestBuilder.omit("id").build(),
        ])
        .setEvents([
          eventBuilder.build()
        ]).build(),
      }
    }
  }

  function allEvents(){
    return {
      data: {
        events: [
          createFullEvent("1"),
          createFullEvent("1")
        ],
      },
      success: true
    }
  }
  
  function getEvent(){
    return {
        event: createFullEvent("1")
      }
  }

  function createEvent(){
    return {
      event: createFullEvent("1"),
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
      event: createFullEvent("1"),
      warnings: []
    }
  }

  function editEventPut(){
    return {
      event: createFullEvent("1")
    }
  }
})();