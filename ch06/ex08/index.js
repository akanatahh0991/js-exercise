
/**
 * `template`に存在しないプロパティを`target`から削除する。
 * `target`にある`Symbol`と継承プロパティは削除対象外である。
 * また、`template`にある継承プロパティは無い場合と同等に動作する。
 * @param {object} target `null`以外の削除先のオブジェクト
 * @param {object} template `null`以外のテンプレートオブジェクト
 * @returns {object} `template`に存在しないプロパティを削除した`target`
 */
export function restrict(target, template) {
  const templateOwnProperties = Object.getOwnPropertyNames(template);
  for (const targetOwnProp of Object.getOwnPropertyNames(target)) {
    if (!templateOwnProperties.includes(targetOwnProp)) {
      delete target[targetOwnProp];
    }
  }
  return target;
}

/**
 * `sources`に含まれるプロパティを`target`から削除する。
 * `target`にある`Symbol`と継承プロパティは削除対象外である。
 * また、`template`にある`Symbol`と継承プロパティは削除対象にならない。
 * @param {object} target `null`以外の削除先のオブジェクト
 * @param  {...object} sources `null`以外のテンプレートオブジェクト
 * @returns {object} `sources`に含まれるプロパティを削除した`target`
 */
export function substract(target, ...sources) {
  const sourceOwnProps = new Set(
    sources.map((source) => Object.getOwnPropertyNames(source)).flat()
  );
  sourceOwnProps.forEach((p) => {
    delete target[p];
  });
  return target;
}