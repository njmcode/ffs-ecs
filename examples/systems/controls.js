/**
 * System to handle key-controlled entities
 **/
var ControlsSystem = (function($) {
  
  var KEY_CODES = {
    W: 87,
    A: 65,
    S: 83,
    D: 68
  };
  var KEYS = [];
     
  function init(options) {
    for(var i = 0; i < 128; i++) {
      KEYS[i] = { isPressed: false }
    };
    
    $(document).on('keydown', function(e) {
      KEYS[e.which].isPressed = true;
    });
    $(document).on('keyup', function(e) {
      KEYS[e.which].isPressed = false;
    });
  }
  
  function isPressed(keyCode) {
    return KEYS[KEY_CODES[keyCode]].isPressed;
  }
  
  function update(ents) {

    ents.forEach(function(entity) {
      if(!entity.has('ControlsWASD') || !entity.has('Position')) return;
      
      if(isPressed('W')) entity.y -= entity.moveSpeed;
      if(isPressed('S')) entity.y += entity.moveSpeed;
      if(isPressed('A')) entity.x -= entity.moveSpeed;
      if(isPressed('D')) entity.x += entity.moveSpeed;
      
    });
  }
  
  return {
    init: init,
    update: update
  }
  
})($);