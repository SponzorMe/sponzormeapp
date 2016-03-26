var perkTaskBuilder = (function() {
  
  var _resultPerkTask = {
    id: "11",
    title: "Prueba",
    description: "asas sdsd",
    perk_id: "3",
    status: "1",
    event_id: "1002",
    type: "1",
    user_id: "1002",
    Event: {},
    Perk: {},
    User: {},
    PerkTask: {
      id: "11",
      title: "Prueba",
      description: "asas sdsd",
      perk_id: "3",
      status: "1",
      event_id: "1002",
      type: "1",
      user_id: "1002",
    }
  };
  
  return {
    build: build,
    setId: setId,
    omit: omit
  }
  
  function build() {
    return _resultPerkTask;
  }
  
  function setId(id){
    _resultPerkTask.id = id;
    return this;
  }
  
  function omit(name){
    _resultPerk = _.omit(_resultPerk, name);
    return this;
  }
  
})();