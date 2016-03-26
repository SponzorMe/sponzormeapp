var sponsorshipBuilder = (function() {
  
  var _resultSponsorship = {
    id: "30",
    cause: "test",
    event_id: "1002",
    organizer_id: "1003",
    perk_id: "3",
    sponzor_id: "1002",
    status: "0",
    Event: {},
    Organizer: {},
    Perk: {},
    Sponzor: {},
    SponzorEvent: {
      id: "30",
      cause: "test",
      event_id: "1002",
      organizer_id: "1003",
      perk_id: "3",
      sponzor_id: "1002",
      status: "0",
    },
    Tasks: []
  };
  
  return {
    build: build,
    omit: omit,
    setEvent: setEvent,
  }
  
  function build() {
    return _resultSponsorship;
  }
  
  function setEvent(event){
    _resultSponsorship.event = event;
    return this;
  }
  
  function omit(name){
    _resultSponsorship = _.omit(_resultSponsorship, name);
    return this;
  }
  
})();

