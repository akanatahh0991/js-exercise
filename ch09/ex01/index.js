
export function C() {}
C.method = function() { return 1};
C.prototype.method = function() { return 2};
C.C = function() {}
C.C.method = function() { return 3};
C.C.prototype.method = function() { return 4};
C.prototype.C = function() {}
C.prototype.C.method = function() { return 5};
C.prototype.C.prototype.method = function() { return 6};
