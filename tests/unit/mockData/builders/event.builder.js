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
    omit: omit,
    setId: setId,
    setTitle: setTitle,
    setLocation: setLocation,
    setStarts: setStarts,
    setEnds: setEnds,
    setImage: setImage,
    setCategory: setCategory,
    setType: setType,
    setUserOrganizer: setUserOrganizer,
    setPerks: setPerks, 
    setSponzorTasks: setSponzorTasks,
    setSponzorship: setSponzorship
  }
  
  function build() {
    return _resultEvent;
  }
  
  function omit(args){
    _resultEvent = _.omit(_resultEvent, args);
    return this;
  }
  
  function setId(id){
    _resultEvent.id = id;
    return this;
  }
  
  function setTitle(title){
    _resultEvent.title = title;
    return this;
  }
  
  function setLocation(location){
    _resultEvent.location = location;
    return this;
  }
  
  function setStarts(starts){
    _resultEvent.starts = starts;
    return this;
  }
  
  function setEnds(ends){
    _resultEvent.ends = ends;
    return this;
  }
  
  function setImage(image){
    _resultEvent.image = image;
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
  
  function setSponzorTasks(sponzor_tasks){
    _resultEvent.sponzor_tasks = sponzor_tasks;
    return this;
  }
  
  function setSponzorship(sponzorship){
    _resultEvent.sponzorship = sponzorship;
    return this;
  }
  
})();