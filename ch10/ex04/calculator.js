// 名前付きエクスポート
export const plus = (x, y) => {
    return x + y;
}

// デフォルトエクスポート
export default (x, y) => {
    return x - y;
}

// デフォルトエクスポートと名前付きエクスポートは同じファイルで記載しないほうがいい。