var interestBuilder = (function() {
   
  var _resultInterest = {
    id: "1",
    category_id: "1",
    description: "Tutorials About Photoshop",
    lang: "en",
    name: "Live Music"
  };
  
  return {
    build: build,
    setId: setId,
    omit: omit
  }
  
  function build() {
    return _resultInterest;
  }
  
  function setId(id){
    _resultInterest.id = id;
    return this;
  }
  
  function omit(name){
    _resultInterest = _.omit(_resultInterest, name);
    return this;
  }
  
})();