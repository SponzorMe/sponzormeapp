var sponsorshipBuilder = (function() {
  
  var _resultSponsorship = init();
  
  return {
    build: build,
    omit: omit,
    setId: setId,
    setCause: setCause,
    setEventId: setEventId,
    setOrganizerId: setOrganizerId,
    setPerkId: setPerkId,
    setSponzorId: setSponzorId,
    setStatus: setStatus,
    setEvent: setEvent,
    setOrganizer: setOrganizer,
    setPerk: setPerk,
    setSponzor: setSponzor,
    setTasks: setTasks
  }
  
  function init(){
    return {
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
  }
  
  function build() {
    var copy = _.clone(_resultSponsorship);
    _resultSponsorship = init();
    return copy;
  }
  
  function omit(args){
    _resultSponsorship = _.omit(_resultSponsorship, args);
    return this;
  }
  
  function setId(id){
    _resultSponsorship.id = id;
    return this;
  }
  
  function setCause(cause){
    _resultSponsorship.cause = cause;
    return this;
  }
  
  function setEventId(event_id){
    _resultSponsorship.event_id = event_id;
    return this;
  }
  
  function setOrganizerId(organizer_id){
    _resultSponsorship.organizer_id = organizer_id;
    return this;
  }
  
  function setPerkId(perk_id){
    _resultSponsorship.perk_id = perk_id;
    return this;
  }
  
  function setSponzorId(sponzor_id){
    _resultSponsorship.sponzor_id = sponzor_id;
    return this;
  }
  
  function setStatus(status){
    _resultSponsorship.status = status;
    return this;
  }
  
  function setEvent(event){
    _resultSponsorship.Event = event;
    return this;
  }
  
  function setOrganizer(organizer){
    _resultSponsorship.Organizer = organizer;
    return this;
  }
  
  function setPerk(perk){
    _resultSponsorship.Perk = perk;
    return this;
  }
  
  function setSponzor(sponzor){
    _resultSponsorship.Sponzor = sponzor;
    return this;
  }
  
  function setTasks(tasks){
    _resultSponsorship.Tasks = tasks;
    return this;
  }
  
  
})();

