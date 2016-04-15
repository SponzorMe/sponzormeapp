var taskBuilder = (function() {
  
  var _resultTask = init();
  
  return {
    build: build,
    omit: omit,
    setId: setId,
    setPerkId: setPerkId,
    setStatus: setStatus,
    setTitle: setTitle,
    setType: setType,
    setUserId: setUserId
  }
  
  function init(){
    return {
      id: "11",
      perk_id: "3",
      status: "1",
      title: "Prueba",
      type: "1",
      user_id: "1"
    };
  }
  
  function build() {
    var copy = angular.copy(_resultTask);
    _resultTask = init();
    return copy;
  }
  
  function omit(args){
    _resultTask = _.omit(_resultTask, args);
    return this;
  }
  
  function setId(id){
    _resultTask.id = id;
    return this;
  }
  
  function setPerkId(perk_id){
    _resultTask.perk_id = perk_id;
    return this;
  }
  
  function setStatus(status){
    _resultTask.status = status;
    return this;
  }
  
  function setTitle(title){
    _resultTask.title = title;
    return this;
  }
  
  function setType(type){
    _resultTask.type = type;
    return this;
  }
  
  function setUserId(user_id){
    _resultTask.user_id = user_id;
    return this;
  }
  
})();

