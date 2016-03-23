var userBuilder = (function() {
  
  var _resultUser = {
    id: "1",
    email: "mail@domain.com",
    age: "12",
    comunity_size: "0",
    image: "",
    events: [],
    sponzorships_like_organizer: [],
    sponzorship: []
  };
  
  return {
    build: build,
    setImage: setImage,
    setEvents: setEvents,
    setSponzorships: setSponzorships,
    setponzorshipLikeOrganizer: setponzorshipLikeOrganizer,
    omit: omit,
  }
  
  function build() {
    return _resultUser;
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
  
  function setponzorshipLikeOrganizer(sponzorships){
    _resultUser.sponzorships_like_organizer = sponzorships;
    return this;
  }
  
  function omit(name){
    _resultUser = _.omit(_resultUser, name);
    return this;
  }
  
})();