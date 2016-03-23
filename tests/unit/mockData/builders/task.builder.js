var taskBuilder = (function() {
  
  var _resultTask = {
    id: "11",
    perk_id: "3",
    status: "1",
    title: "Prueba",
    type: "1",
    user_id: "1002"
  };
  
  return {
    build: build,
    setStatus: setStatus,
    omit: omit
  }
  
  function build() {
    return _resultTask;
  }
  
  function setStatus(status){
    _resultTask.status = status;
    return this;
  }
  
  function omit(name){
    _resultTask = _.omit(_resultTask, name);
    return this;
  }
  
})();

