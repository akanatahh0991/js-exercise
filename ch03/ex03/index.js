
/**
 * aとbが同値かどうかを判定します。
 * aとbの差が1e-10未満の場合はtrueとなります。
 * aとbのいずれかが有限な値でない場合はfalseになります。
 * @param {number} a 
 * @param {number} b 
 */
export function equal(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return false
  }
  return (Math.abs(a-b) < 1e-10)
}