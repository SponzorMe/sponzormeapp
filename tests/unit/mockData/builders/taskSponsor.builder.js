var taskSponsorBuilder = (function() {
  
  var _resultTaskSponsor = {
    id: "1",
    sponzor_id: "1",
    perk_id: "1",
    event_id: "1",
    task_id: "1",
    sponzorship_id: "1",
    organizer_id: "2",
    Task:{},
    Organizer: {},
    Sponzor: {},
    Event: {}
  };
  
  return {
    build: build,
    omit: omit,
    setId: setId,
    setSponsorId: setSponsorId,
    setPerkId: setPerkId,
    setEventId: setEventId,
    setTaskId: setTaskId,
    setOrganizerId: setOrganizerId,
    setTask: setTask,
    setOrganizer: setOrganizer,
    setSponzor: setSponzor,
    setEvent: setEvent
  }
  
  function build() {
    return _resultTaskSponsor;
  }
  
  function omit(args){
    _resultTaskSponsor = _.omit(_resultTaskSponsor, args);
    return this;
  }
  
  function setId(id){
    _resultTaskSponsor.id = id;
    return this;
  }
  
  function setSponsorId(sponzor_id){
    _resultTaskSponsor.sponzor_id = sponzor_id;
    return this;
  }
  
  function setPerkId(perk_id){
    _resultTaskSponsor.perk_id = perk_id;
    return this;
  }
  
  function setEventId(event_id){
    _resultTaskSponsor.event_id = event_id;
    return this;
  }
  
  function setTaskId(task_id){
    _resultTaskSponsor.task_id = task_id;
    return this;
  }
  
  function setTaskId(sponzorship_id){
    _resultTaskSponsor.sponzorship_id = sponzorship_id;
    return this;
  }
  
  function setOrganizerId(organizer_id){
    _resultTaskSponsor.organizer_id = organizer_id;
    return this;
  }
  
  function setTask(task){
    _resultTaskSponsor.Task = task;
    return this;
  }
  
  function setOrganizer(organizer){
    _resultTaskSponsor.Organizer = organizer;
    return this;
  }
  
  function setSponzor(sponzor){
    _resultTaskSponsor.Sponzor = sponzor;
    return this;
  }
  
  function setEvent(event){
    _resultTaskSponsor.Event = event;
    return this;
  }
  
  
  
})();