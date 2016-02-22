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

  return {
    failed: failed,
    userInterestService:{
      createUserInterestSuccess: createUserInterestSuccess,
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
    },
    eventTypeService: {
      allEventTypes: allEventTypes,
      getEventType: getEventType
    },
    tasksSponsorService: {
      getAllTasks: getAllTasks,
      getTask: getTask,
      createTask: createTask,
      editPutTask: editPutTask,
      editPatchTask: editPatchTask,
      deleteTask: deleteTask
    },
    categoryService: {
      allCategories: allCategories,
      getCategory: getCategory,
      getInterests: getInterests
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
  
  function bulkUserInterest() {
    return {
      inserted: [],
      noInserted: []
    }
  }

  function login(){
    var events = [
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
        perks: [
          {
            tasks: [
              {
                user_id: 1,
                status: 0
              },
              {
                user_id: 1,
                status: 1
              }
            ]
          },
        ]
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
        perks: [
          {
            tasks: [
              {
                user_id: 1,
                status: 0
              },
              {
                user_id: 1,
                status: 0
              }
            ]
          },
          {
            tasks: [
              {
                user_id: 1,
                status: 1
              },
              {
                user_id: 1,
                status: 0
              }
            ]
          }
        ]
      }
    ];
    return {
      rating: null,
      success: true,
      token: null,
      user: {
        id: "1",
        email: "mail@domain.com",
        age: "12",
        comunity_size: "0",
        events: events,
        sponzorships_like_organizer: [
          {
            id: "1",
            cause: "Test 1",
            sponzor:{
              id: "1",
              image: "",
            },
            event:{
              id: "1",
              starts: "2016-01-09 15:00:00",
              ends: "2016-01-09 15:00:00"
            }
          },
          {
            id: "2",
            cause: "Test 2",
            sponzor:{
              id: "2",
              image: "",
              starts: "2016-01-09 15:00:00",
              ends: "2016-01-09 15:00:00"
            },
            event:{
              id: "2",
              starts: "2016-01-09 15:00:00",
              ends: "2016-01-09 15:00:00"
            }
          }
        ],
        sponzorships: [
           {
            cause: "test",
            event_id: "1002",
            event:{
              id: 1,
              starts: "2016-01-09 15:00:00",
              ends: "2016-01-09 15:00:00"
            },
            id: "30",
            organizer_id: "1003",
            organizer:{
              id: 1
            },
            perk_id: "3",
            perk:{
              id: 1,
              tasks: [
                {
                  id: "1",
                  status: "0"
                }
              ]
            },
            sponzor_id: "1002",
            sponzor:{
              id: "2",
              image: "",
              starts: "2016-01-09 15:00:00",
              ends: "2016-01-09 15:00:00"
            },
            status: "0",
            task_sponzor: [
              {
                id: "1",
                task:{
                  id: "1",
                  status: "0"
                }
              }
            ]
          }
        ]
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
              ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
            }                                                         
          ]
        }
      }
    }
  }
  
  function home(){
    var events = [
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
        perks: [
          {
            tasks: [
              {
                user_id: 1,
                status: 0
              },
              {
                user_id: 1,
                status: 1
              }
            ]
          },
        ]
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
        perks: [
          {
            tasks: [
              {
                user_id: 1,
                status: 0
              },
              {
                user_id: 1,
                status: 0
              }
            ]
          },
          {
            tasks: [
              {
                user_id: 1,
                status: 1
              },
              {
                user_id: 1,
                status: 0
              }
            ]
          }
        ]
      }
    ];
    return {
      data: {
        rating: null,
        success: true,
        token: null,
        user: {
          id: "1",
          email: "mail@domain.com",
          age: "12",
          comunity_size: "0",
          events: events,
          sponzorships_like_organizer: [
            {
              id: "1",
              cause: "Test 1",
              sponzor:{
                id: "1",
                image: "",
              },
              event:{
                id: "1",
                starts: "2016-01-09 15:00:00",
                ends: "2016-01-09 15:00:00"
              }
            },
            {
              id: "2",
              cause: "Test 2",
              sponzor:{
                id: "2",
                image: "",
                starts: "2016-01-09 15:00:00",
                ends: "2016-01-09 15:00:00"
              },
              event:{
                id: "2",
                starts: "2016-01-09 15:00:00",
                ends: "2016-01-09 15:00:00"
              }
            }
          ],
          sponzorships: [
            {
              cause: "test",
              event_id: "1002",
              event:{
                id: 1,
                starts: "2016-01-09 15:00:00",
                ends: "2016-01-09 15:00:00"
              },
              id: "30",
              organizer_id: "1003",
              organizer:{
                id: 1
              },
              perk_id: "3",
              perk:{
                id: 1,
                tasks: [
                  {
                    id: "1",
                    status: "0"
                  }
                ]
              },
              sponzor_id: "1002",
              sponzor:{
                id: "2",
                image: "",
                starts: "2016-01-09 15:00:00",
                ends: "2016-01-09 15:00:00"
              },
              status: "0",
              task_sponzor: [
                {
                  id: "1",
                  task:{
                    id: "1",
                    status: "0"
                  }
                }
              ]
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
        SponzorEvent: {
          id: 1
        },
        Tasks: []
      }
    }
  }

  function sponzorshipByOrganizer(){
    return {
      SponzorsEvents: [
        {
          event_id: 1,
          title: 'event',
          starts: "2016-01-09 15:00:00",
          ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        },
        {
          event_id: 1,
          title: 'event',
          starts: "2016-01-09 15:00:00",
          ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        }
      ]
    }
  }

  function sponzorshipBySponzor(){
    return {
      SponzorsEvents: [
        {
          event_id: 1,
          title: 'event',
          status: 1,
          starts: "2016-01-09 15:00:00",
          ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        },
        {
          event_id: 1,
          title: 'event',
          status: 0,
          starts: "2016-01-09 15:00:00",
          ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        },
        {
          event_id: 1,
          title: 'event',
          status: 2,
          starts: "2016-01-09 15:00:00",
          ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
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
          eventEnds: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
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
          eventEnds: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
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
        Event: {
          id: 1
        },
        Perk: {
          id: 2
        },
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
          eventEnds:moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
          eventStart: "2016-01-07 14:57:00",
          eventTitle: "evento de prueba fhh",
          event_id: "1018",
          id: "36",
          perk_id: "18",
          status: "1",
          title: "Tarea",
          type: "0",
          user_id: "1007"
        },
        {
          description: "Bla bla",
          eventEnds: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
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
      TasksSponzor: []
    }
  }

  function getTask(){
    return {
      data: {
        Task:{},
        Organizer: {},
        Sponzor: {},
        Event: {}
      },
      success: true,
    }
  }

  function createTask(){
    return {
      message: "Inserted",
      TaskSponzor: {
        sponzor_id: "1",
        perk_id: "1",
        event_id: "1",
        task_id: "1",
        sponzorship_id: "1",
        organizer_id: "2",
        id: 2
      },
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
      TaskSponzor: {
        id: 2,
        task_id: "1",
        perk_id: "1",
        sponzor_id: "1",
        organizer_id: "2",
        event_id: "1",
        sponzorship_id: "1",
        status: 0
      }
    }
  }

  function editPutTask(){
    return {
      message: "Updated",
      warnings: [],
      TaskSponzor: {
        id: 2,
        task_id: "1",
        perk_id: "1",
        sponzor_id: "1",
        organizer_id: "2",
        event_id: "1",
        sponzorship_id: "1",
        status: 0
      }
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
        {
          body: "All About the Bussines!",
          id: "1",
          lang: "en",
          title: "Outdoor",
          interests:[
            {
              category_id: "1",
              description: "ida.",
              id_interest: "1",
              lang: "en",
              name: "Outdoors"
            },
            {
              category_id: "1",
              description: "u cibus gravida.",
              id_interest: "2",
              lang: "en",
              name: "Hiking"
            }
          ]
        },
        {
          body: "All About the Bussines!",
          id: "2",
          lang: "en",
          title: "Art & Culture",
          interests:[
            {
              category_id: "1",
              description: "ida.",
              id_interest: "1",
              lang: "en",
              name: "Outdoors",
              check: 1
            },
            {
              category_id: "1",
              description: "u cibus gravida.",
              id_interest: "2",
              lang: "en",
              name: "Hiking",
              check: 1
            }
          ]
        }
      ],
      success: true
    }
  }

  function getCategory(){
    return {
      data: {
        category: {
          body: "All About the Bussines!",
          events: [
            {
              category: "2",
              description: "asas",
              ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
              id: "1015",
              image: "https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg",
              lang: "en",
              location: "San Bernardo, San Bernardo, Región Metropolitana, Chile",
              location_reference: "ChIJ-y1tA2LZYpYRBUJ1tdTUjT0",
              privacy: "0",
              starts: "2016-01-28 18:57:00",
              title: "Un vistazo a Ionic 1.2.x",
              type: "2"
            },
            {
              category: "2",
              description: "asas",
              ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
              id: "1015",
              image: "https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg",
              lang: "en",
              location: "San Bernardo, San Bernardo, Región Metropolitana, Chile",
              location_reference: "ChIJ-y1tA2LZYpYRBUJ1tdTUjT0",
              privacy: "0",
              starts: "2016-01-28 18:57:00",
              title: "Un vistazo a Ionic 1.2.x",
              type: "2"
            }
          ],
          id: "2",
          interests: [
            {
              category_id: "2",
              description: "Tutorials About Photoshop",
              id_interest: "13",
              lang: "en",
              name: "Live Music"
            },
            {
              category_id: "2",
              description: "Tutorials About Photoshop",
              id_interest: "14",
              lang: "en",
              name: "Performing Arts"
            }
          ],
          lang: "en",
          title: "Art & Culture"
        }
      }
    }
  }

  function getInterests(){
    return [
      {
        body: "All About the Bussines!",
        id: "1",
        lang: "en",
        title: "Outdoor",
        interests: [
          {
            category_id: "2",
            description: "Tutorials About Photoshop",
            id_interest: "1",
            lang: "en",
            name: "Live Music",
            check: true
          },
          {
            category_id: "2",
            description: "Tutorials About Photoshop",
            id_interest: "2",
            lang: "en",
            name: "Performing Arts",
            check: false
          }
        ]
      },
      {
        body: "All About the Bussines!",
        id: "2",
        lang: "en",
        title: "Outdoor",
        interests: [
          {
            category_id: "2",
            description: "Tutorials About Photoshop",
            id_interest: "3",
            lang: "en",
            name: "Live Music",
            check: true
          },
          {
            category_id: "2",
            description: "Tutorials About Photoshop",
            id_interest: "4",
            lang: "en",
            name: "Performing Arts",
            check: true
          }
        ]
      },
    ]
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
            type: "1"
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
            type: "1"
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
        type: "1"
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
        message: "Updated"
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
        message: "Updated"
      }
    }
  }

})();