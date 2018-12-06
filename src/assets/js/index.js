$(function () {
  Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  //声明----如果有此 contains 直接用最好
  Array.prototype.contains = function (val) {
    for (i in this) {
      if (this[i] == val) return true;
    }
    return false;
  };
})
