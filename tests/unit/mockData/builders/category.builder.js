var categoryBuilder = (function() {
  
  var _resultCategory = {
    id: "1",
    body: "All About the Bussines!",
    lang: "en",
    title: "Outdoor",
    interests: []
  };
  
  return {
    build: build,
    setId: setId,
    setInterests: setInterests,
    omit: omit
  }
  
  function build() {
    return _resultCategory;
  }
  
  function setId(id){
    _resultUser.id = id;
    return this;
  }
  
  function setInterests(interests){
    _resultUser.interests = interests;
    return this;
  }
  
  function omit(name){
    _resultCategory = _.omit(_resultCategory, name);
    return this;
  }
  
})();