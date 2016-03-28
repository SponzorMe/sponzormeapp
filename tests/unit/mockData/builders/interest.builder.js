var interestBuilder = (function() {
   
  var _resultInterest = {
    id: "1",
    id_interest: "1",
    category_id: "1",
    description: "Tutorials About Photoshop",
    lang: "en",
    name: "Live Music"
  };
  
  return {
    build: build,
    omit: omit,
    setId: setId,
    setCategoryId: setCategoryId,
    setDescription: setDescription,
    setLang: setLang,
    setName: setName
  }
  
  function build() {
    return _resultInterest;
  }
  
  function omit(args){
    _resultInterest = _.omit(_resultInterest, args);
    return this;
  }
  
  function setIdInterest(id_interest){
    _resultInterest.id_interestid = id_interest;
    return this;
  }
  
  function setId(id){
    _resultInterest.id = id;
    return this;
  }
  
  function setCategoryId(id){
    _resultInterest.category_id = id;
    return this;
  }
  
  function setDescription(description){
    _resultInterest.description = description;
    return this;
  }
  
  function setLang(lang){
    _resultInterest.lang = lang;
    return this;
  }
  
  function setName(name){
    _resultInterest.name = name;
    return this;
  }
  
})();