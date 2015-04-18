/**
 * System for entity motion (velocity, gravity, bouncing etc).
 **/
var MotionSystem = (function() {

  var GRAVITY = 0.08,
      stageSize;
  
  function init(config) {
    stageSize = config.stageSize;
  }
  
  function update(ents) {
    if (!ents) return;
    
    ents.forEach(function(entity) {
      
      if(!entity.has('Position') &&
         !entity.has('Velocity')) return;
      
      // subtract gravity
      if(entity.has('Gravity')) entity.vy += GRAVITY;
      
      // check for edge collision
      var cleft = false,
          cright = false,
          ctop = false,
          cbottom = false;
      
      var min = (entity.has('Size')) ? entity._hsize : 0,
          max = (entity.has('Size')) ? stageSize - entity._hsize : stageSize;

      if(entity.x < min) cleft = true;
      if(entity.x > max) cright = true;
      if(entity.y < min) ctop = true;
      if(entity.y > max) cbottom = true;
      
      if(entity.has('StageConstrain')) {
        // keep inside edges
        if(cleft) entity.x = min;
        if(cright) entity.x = max;
        if(ctop) entity.y = min;
        if(cbottom) entity.y = max;

        // bounce with damping
        if(entity.has('StageBounce')) {
          if(cleft || cright) {
            entity.vx = -entity.vx;
            entity.vx *= 1 - entity.damping;
          }
          if(ctop || cbottom) {
            entity.vy = -entity.vy;
            entity.vy *= 1 - entity.damping;
          }
        }
      }
      
      // Wrap-around
      if(entity.has('StageWrap')) {
        if(cleft) entity.x = max;
        if(cright) entity.x = min;
        if(ctop) entity.y = max;
        if(cbottom) entity.y = min;
      }
      
      // reposition based on velocity
      if(entity.has('Velocity')) {
        entity.x = Math.round(entity.x + entity.vx);
        entity.y = Math.round(entity.y + entity.vy);
      }
      
      // rotation update {
      if(entity.has('AutoRotate')) {
        entity.rot += entity.rotSpeed;
      }
  
    });
  }
  
  
  return {
    init: init,
    update: update
  }
  
})();