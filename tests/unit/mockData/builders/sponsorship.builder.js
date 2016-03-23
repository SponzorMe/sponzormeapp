var sponsorshipBuilder = (function() {
  
  var _resultSponsorship = {
    cause: "test",
    event_id: "1002",
    id: "30",
    organizer_id: "1003",
    perk_id: "3",
    sponzor_id: "1002",
    status: "0"
  };
  
  return {
    build: build,
    omit: omit
  }
  
  function build() {
    return _resultSponsorship;
  }
  
  function omit(name){
    _resultSponsorship = _.omit(_resultSponsorship, name);
    return this;
  }
  
})();

