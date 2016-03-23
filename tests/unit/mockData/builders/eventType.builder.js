var eventTypeBuilder = (function() {
  
  var _resultEventType = {
    id: "1",
    description: "Give us your money",
    lang: "en",
    name: "Charity"
  };
  
  return{
    build: build,
    setId: setId,
    omit: omit
  }
  
  function build() {
    return _resultEventType;
  }
  
  function setId(id){
    _resultEventType.id = id;
    return this;
  }
  
  function omit(name){
    _resultEventType = _.omit(_resultEventType, name);
    return this;
  }
  
})();