var perkBuilder = (function() {
  
  var _resultPerk = init();
  
  return {
    build: build,
    omit: omit,
    setId: setId,
    setEventId: setEventId,
    setKind: setKind,
    setReservedQuantity: setReservedQuantity,
    setTotalQuantity: setTotalQuantity,
    setUsd: setUsd,
    setTasks: setTasks
  }
  
  function init(){
    return {
      id: "1",
      id_event: "1002",
      kind: "A",
      reserved_quantity: "0",
      total_quantity: "2",
      usd: "10",
      tasks: []
    }
  }
  
  function build() {
    var copy = _.clone(_resultPerk);
    _resultPerk = init();
    return copy;
  }
  
  function omit(args){
    _resultPerk = _.omit(_resultPerk, args);
    return this;
  }
  
  function setId(id){
    _resultPerk.id = id;
    return this;
  }
  
  function setEventId(id){
    _resultPerk.id_event = id;
    return this;
  }
  
  function setKind(kind){
    _resultPerk.kind = kind;
    return this;
  }
  
  function setReservedQuantity(reserved_quantity){
    _resultPerk.reserved_quantity = reserved_quantity;
    return this;
  }
  
  function setTotalQuantity(total_quantity){
    _resultPerk.total_quantity = total_quantity;
    return this;
  }
  
  function setUsd(usd){
    _resultPerk.usd = usd;
    return this;
  }
  
  function setTasks(tasks){
    _resultPerk.tasks = tasks;
    return this;
  }
  
  
  
})();