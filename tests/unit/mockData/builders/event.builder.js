var eventBuilder = (function() {
  
  var _resultEvent = {
    id: "1",
    title: "My Second Event",
    location: "Medellin Colombia",
    starts: "2016-01-31 09:57:00",
    ends: moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    image: '',
    user_organizer: {},
    category: {},
    type: {},
    perks: [],
    sponzor_tasks: [],
    sponzorship: []
  };
  
  return {
    build: build,
    setId: setId,
    setCategory: setCategory,
    setType: setType,
    setUserOrganizer: setUserOrganizer,
    setPerks: setPerks,
    omit: omit
  }
  
  function build() {
    return _resultEvent;
  }
  
  function setId(id){
    _resultEvent.id = id;
    return this;
  }
  
  function setCategory(category){
    _resultEvent.category = category;
    return this;
  }
  
  function setType(type){
    _resultEvent.type = type;
    return this;
  }
  
  function setUserOrganizer(user){
    _resultEvent.user_organizer = user;
    return this;
  }
  
  function setPerks(perks){
    _resultEvent.perks = perks;
    return this;
  }
  
  function omit(name){
    _resultEvent = _.omit(_resultEvent, name);
    return this;
  }
  
})();