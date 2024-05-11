
/**
 * `address`がメールアドレスの形式に沿っているかを確認する。
 * @param {string} address メールアドレス
 */
export function isEmailAddress(address) {
    if (address === null || address === undefined) {
        return false;
    }
    const parts = address.split("@")
    if (parts.length !== 2) {
        console.log(`invalid address: ${address}`)
        return false;
    }
    const [local, domain] = parts
    if (local.length < 1 ||  local.length > 64 || domain.length < 1 || local.length + domain.length > 253) {
        console.log(`invalid address: ${address}`)
        return false;
    }
    // TODO []内でエスケープしないと動かない理由を確認する
    if (local.match(/^([A-Za-z0-9]|[!#$%&\'\*\+\-\/=?^_`{|}~])+(\.([A-Za-z0-9]|[!#$%&\'\*\+\-\/=?^_`{|}~])+)*/)?.[0] !== local) {
        console.log(`invalid local-part: ${local}`)
        return false;
    }

    if (domain.match(/^([A-Za-z0-9]|[!#$%&\'\*\+\-\/=?^_`{|}~])+(\.([A-Za-z0-9]|[!#$%&\'\*\+\-\/=?^_`{|}~])+)*/)?.[0] !== domain) {
        console.log(`invalid domain: ${domain}`)
        return false;
    }
    return true;
}
