var categoryBuilder = (function() {
  
  var _resultCategory = {
    id: "1",
    body: "All About the Bussines!",
    lang: "en",
    title: "Outdoor",
    interests: [],
    events: []
  };
  
  return {
    build: build,
    omit: omit,
    setId: setId,
    setBody: setBody,
    setLang: setLang,
    setTitle: setTitle,
    setInterests: setInterests,
    setEvents: setEvents
  }
  
  function build() {
    return _resultCategory;
  }
  
  function omit(args){
    _resultCategory = _.omit(_resultCategory, args);
    return this;
  }
  
  function setId(id){
    _resultCategory.id = id;
    return this;
  }
  
  function setBody(body){
    _resultCategory.body = body;
    return this;
  }
  
  function setLang(lang){
    _resultCategory.lang = lang;
    return this;
  }
  
  function setTitle(title){
    _resultCategory.title = title;
    return this;
  }
  
  function setInterests(interests){
    _resultCategory.interests = interests;
    return this;
  }
  
  function setEvents(events){
    _resultCategory.events = events;
    return this;
  }
  
  
  
})();