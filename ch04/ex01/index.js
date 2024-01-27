/**
 * 実部をre、虚部をimとして保持するオブジェクトaとbの和を計算する。
 * @param {object} a 実部reと虚部imをプロパティとして保持するオブジェクト
 * @param {object} b 実部reと虚部imをプロパティとして保持するオブジェクト
 * @returns aとbの和
 * @throws {RangeError} aおよびbの実部reと虚部imのプロパティがnumberではない場合にthrowする。
 */
export function add(a, b) {
  const { re: re1, im: im1 } = a;
  const { re: re2, im: im2 } = b;
  [re1, im1, re2, im2].forEach((value) => {
    if (typeof value !== "number") {
      throw new RangeError(
        `invalid value a={re:${re1}, im:${im1}}, b={re:${re2}, im:${im2}}`
      );
    }
  });
  return { re: re1 + re2, im: im1 + im2 };
}

/**
 * 実部をre、虚部をimとして保持するオブジェクトaとbの差を計算する。
 * @param {object} a 実部reと虚部imをプロパティとして保持するオブジェクト
 * @param {object} b 実部reと虚部imをプロパティとして保持するオブジェクト
 * @returns aとbの差
 * @throws {RangeError} aおよびbの実部reと虚部imのプロパティがnumberではない場合にthrowする。
 */
export function sub(a, b) {
  const { re: re1, im: im1 } = a;
  const { re: re2, im: im2 } = b;
  [re1, im1, re2, im2].forEach((value) => {
    if (typeof value !== "number") {
      throw new RangeError(
        `invalid value a={re:${re1}, im:${im1}}, b={re:${re2}, im:${im2}}`
      );
    }
  });
  return { re: re1 - re2, im: im1 - im2 };
}

/**
 * 実部をre、虚部をimとして保持するオブジェクトaとbの積を計算する。
 * @param {object} a 実部reと虚部imをプロパティとして保持するオブジェクト
 * @param {object} b 実部reと虚部imをプロパティとして保持するオブジェクト
 * @returns aとbの積
 * @throws {RangeError} aおよびbの実部reと虚部imのプロパティがnumberではない場合にthrowする。
 */
export function mul(a, b) {
  const { re: re1, im: im1 } = a;
  const { re: re2, im: im2 } = b;
  [re1, im1, re2, im2].forEach((value) => {
    if (typeof value !== "number") {
      throw new RangeError(
        `invalid value a={re:${re1}, im:${im1}}, b={re:${re2}, im:${im2}}`
      );
    }
  });
  return { re: re1 * re2 - im1 * im2, im: re1 * im2 + re2 * im1 };
}

/**
 * 実部をre、虚部をimとして保持するオブジェクトaとbの商を計算する。
 * @param {object} a 実部reと虚部imをプロパティとして保持するオブジェクト
 * @param {object} b 実部reと虚部imをプロパティとして保持するオブジェクト
 * @returns aとbの商
 * @throws {RangeError} aおよびbの実部reと虚部imのプロパティがnumberではない場合にthrowする。
 */
export function div(a, b) {
  const { re: re1, im: im1 } = a;
  const { re: re2, im: im2 } = b;
  [re1, im1, re2, im2].forEach((value) => {
    if (typeof value !== "number") {
      throw new RangeError(
        `invalid value a={re:${re1}, im:${im1}}, b={re:${re2}, im:${im2}}`
      );
    }
  });
  if (re2 === 0 && im2 === 0) {
    return {
      re: re1/0, im: im1/0
    }
  }
  return {
    re: (re1 * re2 + im1 * im2) / (re2 ** 2 + im2 ** 2),
    im: (im1 * re2 - re1 * im2) / (re2 ** 2 + im2 ** 2),
  };
}

console.log(div({re: 4, im: 5}, {re: 0, im:0}));
