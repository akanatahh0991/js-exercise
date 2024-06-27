
export function unwritableAndUnconfigurableObj() {
    return Object.freeze({a: 1})
}

export function writableAndUnconfigurableObj() {
    return Object.seal({b: 2})
}

export function nestedUnwritableObj() {
    return Object.freeze({
        c: Object.freeze({
            d: Object.freeze({
                e: 3
            })
        })
    })
}