function trace(o, m) {
  const original = o[m];
  o[m] = function(...args) {
    console.log(new Date(), "Entering:", m);
    const result = original.apply(this, args);
    console.log(new Date(), "Exiting:", m)
    return result;
  }
}

const obj = {
  print: function() { console.log("print")}
}

trace(obj, "print");
obj.print()