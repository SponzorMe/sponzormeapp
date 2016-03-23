var perkBuilder = (function() {
  
  var _resultPerk = {
    id: "1",
    id_event: "1002",
    kind: "A",
    reserved_quantity: "0",
    total_quantity: "2",
    usd: "10",
    tasks: []
  };
  
  return {
    build: build,
    setId: setId,
    setEventId: setEventId,
    setTasks: setTasks,
    omit: omit
  }
  
  function build() {
    return _resultPerk;
  }
  
  function setId(id){
    _resultPerk.id = id;
    return this;
  }
  
  function setEventId(id){
    _resultPerk.id_event = id;
    return this;
  }
  
  function setTasks(tasks){
    _resultPerk.tasks = tasks;
    return this;
  }
  
  function omit(name){
    _resultPerk = _.omit(_resultPerk, name);
    return this;
  }
  
})();