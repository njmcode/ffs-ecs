/**
 * Test code
 **/
(function() {
  
  var config = {
    stageSize: 600
  };

  function createThingy() {
    var thingy = EntityFactory.create();

    var isCircle = !!getRnd(0,1),
        isTriangle = !isCircle && !!getRnd(0,1),
        hasRotation = !isCircle && !!getRnd(0,1),
        rotateSpeed = getRnd(-2, 2),
        color = '#'+Math.floor(Math.random()*16777215).toString(16),
        size = getRnd(10, 50),
        x = getRnd(200, 400),
        y = getRnd(200, 400),
        vx = getRnd(-4, 4),
        vy = getRnd(-6, -3),
        hasGravity = !!getRnd(0,2),
        isGhost = !!getRnd(0,1),
        isAttracted = !!getRnd(0,2);

    if (isCircle) thingy.addComponent('ShapeCircle');
    if (isTriangle) thingy.addComponent('ShapeTriangle');
    if (hasRotation) thingy.addComponent('AutoRotate', rotateSpeed);
    if (isGhost) thingy.addComponent('Ghost');
    if (hasGravity) thingy.addComponent('Gravity');
    if (isAttracted) thingy.addComponent('AttractToMouse');

    thingy.addComponent('Color', color);
    thingy.addComponent('Size', size);
    thingy.addComponent('Position', { x: x, y: y });
    thingy.addComponent('Velocity', { vx: vx, vy: vy });
    thingy.addComponent('StageConstrain');
    thingy.addComponent('StageBounce', 0.2);
    thingy.addComponent('Rendering');

    return thingy;
  }

  function createShip() {
    var ship = EntityFactory.create();
    ship.addComponent('ShapeTriangle');
    ship.addComponent('Color', 'white');
    ship.addComponent('ColorFlash', '#ff00cc');
    ship.addComponent('Size', 30);
    ship.addComponent('Position', { x: 300, y: 300 });
    ship.addComponent('StageWrap');
    ship.addComponent('ControlsWASD');
    ship.addComponent('Rendering');
    return ship;
  }


  var entities, ship;
  
  function init() {
    var NUM_THINGS = 40;
    for(var i = 0; i < NUM_THINGS; i++) {
      createThingy();
    }
    entities = EntityFactory.getAll();
    ship = [createShip()];

    MotionSystem.init(config);
    RenderSystem.init(config);
    MouseSystem.init(config);
    ControlsSystem.init(config);
  }

  function update() {
    MouseSystem.update(entities);
    ControlsSystem.update(ship);
    MotionSystem.update(entities);
  }

  function render() {
    RenderSystem.update(entities);
  }

  function loop() {
    requestAnimationFrame(loop);
    update();
    render();
  }

  init();
  loop();

})();