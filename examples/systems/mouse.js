/**
 * System for entities interacting with the mouse.
 **/
var MouseSystem = (function($) {
  
  var ATTRACT_RADIUS = 200,
      ATTRACT_STRENGTH = 0.6,
      cfg,
      isOn = false,
      mouse = { x: 0, y: 0 },
      _ents;
  
  function getDist(p1, p2) {
    return Math.sqrt(((p2.x - p1.x) * (p2.x - p1.x)) + ((p2.y - p1.y) * (p2.y - p1.y)));
  }
  
  function init(config) {
    cfg = config;
    // TODO: come up with a way to share canvas etc between systems
    $('canvas').on('mouseover mousemove', function(e) { _updateMousePos(e); });
    $('canvas').on('mouseout', _disableMousePos);
    $('canvas').on('click', _explode);
  }
  
  function _updateMousePos(e) {
    isOn = true;
    var isFF = (e.offsetX === undefined);
    mouse.x = (isFF) ? e.pageX-$(this).offset().left : e.offsetX;
    mouse.y = (isFF) ? e.pageY-$(this).offset().top : e.offsetY;
  }
  
  function _disableMousePos() {
    isOn = false;
  }
  
  function _explode() {
    _ents.forEach(function(entity) {
      if (!entity.has('Velocity')) return;
      entity.vx = getRnd(-5, 5);
      entity.vy = getRnd(-4, -8);
    });
  }
  
  function update(ents) {
    if(!isOn) return;
    
    _ents = ents;
    
    ents.forEach(function(entity) {
      if(!entity.has('AttractToMouse') ||
         !entity.has('Velocity') ||
         !entity.has('Position')) return;
      
      var dist = getDist(mouse, entity);
      if(dist > ATTRACT_RADIUS) return;
      
      entity.vx += (entity.x > mouse.x) ? -ATTRACT_STRENGTH : ATTRACT_STRENGTH;
      entity.vy += (entity.y > mouse.y) ? -ATTRACT_STRENGTH : ATTRACT_STRENGTH;
    });
  }
  
  return {
    init: init,
    update: update
  }
  
})($);