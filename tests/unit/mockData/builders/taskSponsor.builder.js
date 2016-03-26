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
    setId: setId,
    omit: omit
  }
  
  function build() {
    return _resultTaskSponsor;
  }
  
  function setId(id){
    _resultTaskSponsor.id = id;
    return this;
  }
  
  function omit(name){
    _resultTaskSponsor = _.omit(_resultTaskSponsor, name);
    return this;
  }
  
})();