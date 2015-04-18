/**
 * System for Canvas rendering of entities.
 **/
var RenderSystem = (function() {
  
  var c, ctx, bufferc, bufferctx, hsize, cfg;
  
  function init(config) {
    cfg = config;
    
    c = document.createElement('canvas');
    ctx = c.getContext('2d');
    
    bufferc = document.createElement('canvas');
    bufferctx = bufferc.getContext('2d');
    
    c.width = c.height = 
      bufferc.width = bufferc.height = cfg.stageSize;
    hsize = Math.floor(cfg.stageSize * 0.5);
    
    var b = document.body || document.documentElement;
    b.appendChild(c);

  }
  
  function toRad(angle) {
    return angle * Math.PI / 180;
  }
  
  function update(ents) {
    bufferctx.clearRect(0, 0, cfg.stageSize, cfg.stageSize);
    ctx.clearRect(0, 0, cfg.stageSize, cfg.stageSize);

    var now = Date.now();
    
    ents.forEach(function(entity) {
      if(! entity.has('Rendering') && 
         ! entity.has('Position') &&
         ! entity.has('Size')) return;
      
      // Use color, handle flashing
      var col = (entity.has('Color')) ? entity.color : '#ffffff';
      if(entity.has('ColorFlash')) {
         col = (entity._toggleFlash) ? entity.flashColor : col;
        if(now - entity._flashTimer > entity.flashSpeed) {
            entity._toggleFlash = !entity._toggleFlash;
            entity._flashTimer = now;
        }
      }
      bufferctx.fillStyle = col;
      
      // Rotate
      var needsRestore = false;
      if(entity.has('AutoRotate')) {
        bufferctx.save();
        bufferctx.translate(entity.x, entity.y);
        bufferctx.rotate(toRad(entity.rot));
        bufferctx.translate(-entity.x, -entity.y);
        needsRestore = true;
      }
      
      // Draw circle or rect
      var drawFn;
      
      if(entity.has('ShapeCircle')) {
        drawFn = function(context) {
          context.beginPath();
          context.arc(entity.x, entity.y, entity._hsize, 0, 2 * Math.PI, false);
          context.fill();
        }
      } else if(entity.has('ShapeTriangle')) {
        drawFn = function(context) {
          context.beginPath();
          context.moveTo(entity.x - entity._hsize, entity.y + entity._hsize);
          context.lineTo(entity.x, entity.y - entity._hsize);
          context.lineTo(entity.x + entity._hsize, entity.y + entity._hsize);
          context.fill();
        }
      }else {
        drawFn = function(context) {
          context.fillRect(entity.x - entity._hsize, entity.y - entity._hsize, entity.size, entity.size);
        }
      }
      
      // Reduce alpha if ghost
      if(entity.has('Ghost')) bufferctx.globalAlpha = 0.6;
      
      drawFn(bufferctx);
      
      if(entity.has('Ghost')) bufferctx.globalAlpha = 1;
      
      if(needsRestore) bufferctx.restore();
    });
    ctx.drawImage(bufferc, 0, 0);
  }
  
  return {
    init: init,
    update: update
  }
  
})();