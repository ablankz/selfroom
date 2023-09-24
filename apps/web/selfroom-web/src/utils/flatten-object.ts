/**
 * ネストされたオブジェクトをフラットにする
 * @param {Object} obj ネストされたオブジェクト
 * @return {Object} フラット化されたオブジェクト
 */
export const flattenObject = (obj: { [key: string]: any }) => {
  const result: {
    [key: string]: any;
  } = {};

  // rootにあるkeyごとに処理
  for (const key in obj) {
    // 値を取得
    const value: any = obj[key];

    // value がObjectだった場合はflattenObj(自分自身)を呼び出して処理
    if (typeof value === 'object') {
      const flatObj = flattenObject(value);

      // key と subkey を結合して root の key とする
      for (const subKey in flatObj) {
        result[`${key}.${subKey}`] = flatObj[subKey];
      }
    } else {
      result[key] = value;
    }
  }
  return result;
};
