/** 
 * Components that we can apply to Entities.
 * Do nothing by themselves - Systems use them to
 * provide behaviour and functionality.
 * TODO: come up with something nicer than no-ops
 * for components without params
 **/
var Components = {
  
  AttractToMouse: null,
  AutoRotate: function(speed) {
    this.rot = 0;
    this.rotSpeed = speed || 1;
  },
  Color: function(color) {
    this.color = color || 'white';
  },
  ColorFlash: function(flashColor, flashSpeed) {
    this.flashColor = flashColor || 'red';
    this.flashSpeed = flashSpeed || 300;
    this._flashTimer = Date.now();
    this._flashToggle = false;
  },
  ControlsWASD: function(moveSpeed) {
    this.moveSpeed = moveSpeed || 3;
  },
  Ghost: null,
  Gravity: null,
  Position: function(pos) {
    this.x = pos.x || 0;
    this.y = pos.y || 0;
  },
  Rendering: null,
  ShapeCircle: null,
  ShapeTriangle: null,
  Size: function(size) {
    this.size = size || 50;
    this._hsize = Math.floor(size * 0.5);
  },
  StageBounce: function(damping) {
    this.damping = damping || 0;
  },
  StageConstrain: null,
  StageWrap: null,
  Velocity: function(vels) {
    if(vels === undefined) vels = { vx: 0, vy: 0, vmax: 10 }
    this.vx = vels.vx;
    this.vy = vels.vy;
    this.vmax = vels.max;
  }
  
};