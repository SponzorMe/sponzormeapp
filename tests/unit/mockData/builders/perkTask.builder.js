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
    omit: omit,
    setId: setId,
    setTitle: setTitle,
    setDescription: setDescription,
    setPerkId: setPerkId,
    setStatus: setStatus,
    setEventId: setEventId,
    setType: setType,
    setUserId: setUserId,
    setEvent: setEvent,
    setPerk: setPerk,
    setUser: setUser
  }
  
  function build() {
    return _resultPerkTask;
  }
  
  function omit(args){
    _resultPerk = _.omit(_resultPerkTask, args);
    return this;
  }
  
  function setId(id){
    _resultPerkTask.id = id;
    return this;
  }
  
  function setTitle(title){
    _resultPerkTask.title = title;
    return this;
  }
  
  function setDescription(description){
    _resultPerkTask.description = description;
    return this;
  }
  
  function setPerkId(perk_id){
    _resultPerkTask.perk_id = perk_id;
    return this;
  }
  
  function setStatus(status){
    _resultPerkTask.status = status;
    return this;
  }
  
  function setEventId(event_id){
    _resultPerkTask.event_id = event_id;
    return this;
  }
  
  function setType(type){
    _resultPerkTask.type = type;
    return this;
  }
  
  function setUserId(user_id){
    _resultPerkTask.user_id = user_id;
    return this;
  }
  
  function setEvent(event){
    _resultPerkTask.Event = event;
    return this;
  }
  
  function setPerk(perk){
    _resultPerkTask.Perk = perk;
    return this;
  }
  
  function setUser(user){
    _resultPerkTask.User = user;
    return this;
  }
  
  
  
})();