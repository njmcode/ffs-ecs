if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
}

function getRnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}