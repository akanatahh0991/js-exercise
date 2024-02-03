
try {
  console.log("try start");
  throw new Error();
  // console.log("try end"); //呼ばれない
} catch(e) {
  console.log("catch")
} finally {
  console.log("finally");
}

