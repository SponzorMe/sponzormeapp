var userBuilder = (function() {
  
  var _resultUser = {
    id: "1",
    email: "mail@domain.com",
    age: "12",
    comunity_size: "0",
    image: "",
    name: "as",
    description: "asas",
    company: "asas",
    events: [],
    sponzorships_like_organizer: [],
    sponzorship: []
  };
  
  return {
    build: build,
    omit: omit,
    setId: setId,
    setImage: setImage,
    setEvents: setEvents,
    setSponzorships: setSponzorships,
    setSponzorshipLikeOrganizer: setSponzorshipLikeOrganizer,
  }
  
  function build() {
    return _resultUser;
  }
  
  function omit(args){
    _resultUser = _.omit(_resultUser, args);
    return this;
  }
  
  function setId(id){
    _resultUser.id = id;
    return this;
  }
  
  function setImage(image){
    _resultUser.image = image;
    return this;
  }
  
  function setEvents(events){
    _resultUser.events = events;
    return this;
  }
  
  function setSponzorships(sponzorships){
    _resultUser.sponzorship = sponzorships;
    return this;
  }
  
  function setSponzorshipLikeOrganizer(sponzorships){
    _resultUser.sponzorships_like_organizer = sponzorships;
    return this;
  }
  
  
  
})();