export function counterGroup() {
  const createdCounters = []
  function counter() {
    let n = 0;
    return {
      value: function() { return n },
      count: function() { return n++ },
      reset: function() { n = 0; }
    }
  }

  return {
    newCounter: function() { 
      const newCounter = counter();
      createdCounters.push(newCounter);
      return newCounter;
    },
    total: function() {
      return createdCounters.reduce((totalCount, currentCounter) => totalCount += currentCounter.value(), 0);
    }
  }
}

const group = counterGroup()
const counter1 = group.newCounter();
const counter2 = group.newCounter();
const counter3 = group.newCounter();
counter1.count()
counter1.count()
counter2.count()
counter3.count()
counter3.count()
counter3.count()

console.log(counter1.value());
console.log(group.total())