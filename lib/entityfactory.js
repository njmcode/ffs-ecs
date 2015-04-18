/** 
 * Module to create an Entity 
 **/

if(!window.Components) throw ('EntityFactory requires a Components object to initialize');

var EntityFactory = (function(ComponentCollection) {
  
  var entityCount = 0,
      entities = [];
  
  var Entity = function() {
    this.uid = Date.now() + Math.floor(Math.random() * 100000) + '_' + entityCount;
    this._components = [];
  };
  
  Entity.prototype = {
    addComponent: function(componentId, params) {
      this._components[componentId] = params;
      if(typeof ComponentCollection[componentId] === 'function') {
         ComponentCollection[componentId].call(this, params);
      }
    },
    removeComponent: function(componentId) {
      if(this._components.hasOwnProperty(componentId)) {
        this._components[componentId] = undefined;
        delete this._components[componentId];
      }
    },
    has: function(componentId) {
      return this._components.hasOwnProperty(componentId);
    }
  };
  
  function createEntity(componentList) {
    var entity = new Entity(componentList);
    entities.push(entity);
    entityCount = entities.length;
    return entity;
  }
  
  function getEntities() {
    return entities;
  }
  
  return {
    create: createEntity,
    getAll: getEntities
  }
  
})(Components);