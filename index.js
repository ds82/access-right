'use strict';

var _CONST = {
  'ROOT_RIGHT_SYMBOL': '*'
};

var mod = {};
module.exports = mod;

mod.isAllowed = function(has, requires) {
  has = has || [];
  requires = requires || [];
  requires = (isArray(requires)) ? requires : [requires];

  return isEmpty(requires) || isRoot(has) || checkOr(has, requires);
};

function isArray(maybe) {
  return maybe && typeof maybe === 'object' && maybe.hasOwnProperty('length');
}

function isEmpty(requires) {
  var isEmptyList = (!requires || requires.length === 0);
  var hasEmptyEntry = (requires[0] === '' && requires.length === 1);
  return isEmptyList || hasEmptyEntry;
}

function isRoot(has) {
  has = has || [];
  return has.indexOf(_CONST.ROOT_RIGHT_SYMBOL) > -1;
}

function checkOr(has, requires) {
  var found = false;

  has.forEach(function(right) {
    requires.forEach(function(required) {
      right = escapeRegExp(right);
      var regExp = new RegExp('^' + right + '(\\.[a-zA-Z\\.]*)*$');
      found = found || regExp.test(required);
    });
  });
  return found;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
