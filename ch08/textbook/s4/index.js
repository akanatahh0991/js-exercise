function add(x, y) { return x + y; }
function subtract(x, y) { return x - y }
function multiply(x, y) { return x * y }
function divide(x, y) { return x / y}

function operate(operator, operand1, operand2) {
  return operator(operand1, operand2)
}

const i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));


