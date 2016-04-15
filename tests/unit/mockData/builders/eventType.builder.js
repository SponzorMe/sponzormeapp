var eventTypeBuilder = (function() {
  
  var _resultEventType = init();
  
  return{
    build: build,
    omit: omit,
    setId: setId,
    setDescription: setDescription,
    setLang: setLang,
    setName: setName
  }
  
  function init(){
    return {
      id: "1",
      description: "Give us your money",
      lang: "en",
      name: "Charity",
      events: []
    };
  }
  
  function build() {
    var copy = _.clone(_resultEventType);
    _resultEventType = init();
    return copy;
  }
  
  function omit(args){
    _resultEventType = _.omit(_resultEventType, args);
    return this;
  }
  
  function setId(id){
    _resultEventType.id = id;
    return this;
  }
  
  function setDescription(description){
    _resultEventType.description = description;
    return this;
  }
  
  function setLang(lang){
    _resultEventType.lang = lang;
    return this;
  }
  
  function setName(name){
    _resultEventType.name = name;
    return this;
  }
  
  
  
})();