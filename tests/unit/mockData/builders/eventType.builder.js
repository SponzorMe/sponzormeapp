var eventTypeBuilder = (function() {
  
  var _resultEventType = {
    id: "1",
    description: "Give us your money",
    lang: "en",
    name: "Charity"
  };
  
  return{
    build: build,
    omit: omit,
    setId: setId,
    setDescription: setDescription,
    setLang: setLang,
    setName: setName
  }
  
  function build() {
    return _resultEventType;
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